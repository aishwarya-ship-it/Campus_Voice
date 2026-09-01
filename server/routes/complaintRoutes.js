const express = require("express");
const nodemailer = require("nodemailer");

const { pool } = require("../config/db");
const studentAuth = require("../middleware/studentAuth");

const router = express.Router();


// =====================================================
// GMAIL TRANSPORTER
// =====================================================

const transporter = nodemailer.createTransport({

    host: "smtp.gmail.com",

    port: 587,

    secure: false,

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    },

    tls: {

        rejectUnauthorized: false

    }

});


// =====================================================
// POST - SUBMIT COMPLAINT
// POST /api/complaints/submit
// =====================================================

router.post(
    "/complaints/submit",
    studentAuth,
    async (req, res) => {

        try {

            const {
                complaintType,
                category,
                complaint
            } = req.body || {};


            // =================================================
            // REQUIRED FIELDS
            // =================================================

            if (
                !complaintType ||
                !category ||
                !complaint ||
                !complaint.trim()
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Please fill all required complaint details"

                });

            }


            // =================================================
            // GET LOGGED-IN STUDENT FROM JWT
            // =================================================

            const studentId =
                req.studentId;


            if (!studentId) {

                return res.status(401).json({

                    success: false,

                    message:
                        "Student authentication required"

                });

            }


            // =================================================
            // GET STUDENT DETAILS FROM MYSQL
            // =================================================

            const [studentRows] =
                await pool.execute(

                    `SELECT
                        student_id,
                        name,
                        department,
                        year,
                        email
                     FROM students
                     WHERE student_id = ?`,

                    [studentId]

                );


            if (studentRows.length === 0) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Student not found"

                });

            }


            const student =
                studentRows[0];


            // =================================================
            // PERSONAL COMPLAINT
            // =================================================

            const complaintName =
                complaintType === "Personal"
                    ? student.name
                    : "";


            // =================================================
            // INSERT COMPLAINT INTO MYSQL
            // =================================================

            const [result] =
                await pool.execute(

                    `INSERT INTO complaints
                    (
                        student_id,
                        complaint_type,
                        name,
                        department,
                        category,
                        complaint,
                        status
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?)`,

                    [
                        student.student_id,
                        complaintType,
                        complaintName,
                        student.department,
                        category,
                        complaint.trim(),
                        "Pending"
                    ]

                );


            const complaintId =
                result.insertId;


            // =================================================
            // EMAIL CONTENT
            // =================================================

            const mailOptions = {

                from:
                    process.env.EMAIL_USER,

                to:
                    process.env.EMAIL_USER,

                subject:
                    "New Campus Voice Complaint",

                html: `

                    <div style="
                        font-family: Arial, sans-serif;
                        padding: 20px;
                        line-height: 1.6;
                    ">

                        <h2 style="
                            color: #1769ff;
                        ">
                            Campus Voice - New Complaint
                        </h2>

                        <hr>

                        <p>
                            <strong>
                                Complaint Type:
                            </strong>

                            ${complaintType}
                        </p>


                        ${
                            complaintType === "Personal"
                                ? `
                                    <p>
                                        <strong>
                                            Student Name:
                                        </strong>

                                        ${student.name}
                                    </p>
                                `
                                : `
                                    <p>
                                        <strong>
                                            Student Name:
                                        </strong>

                                        Anonymous
                                    </p>
                                `
                        }


                        <p>
                            <strong>
                                Department:
                            </strong>

                            ${student.department}
                        </p>


                        <p>
                            <strong>
                                Category:
                            </strong>

                            ${category}
                        </p>


                        <p>
                            <strong>
                                Complaint:
                            </strong>
                        </p>


                        <p>
                            ${complaint.trim()}
                        </p>


                        <p>
                            <strong>
                                Status:
                            </strong>

                            Pending
                        </p>


                        <hr>


                        <p>
                            This complaint was submitted through
                            <strong>
                                Campus Voice
                            </strong>.
                        </p>

                    </div>

                `

            };


            // =================================================
            // SEND EMAIL
            // =================================================

            try {

                await transporter.sendMail(
                    mailOptions
                );

                console.log(
                    "📧 Email sent successfully"
                );

            }

            catch (emailError) {

                console.error(
                    "❌ Email Error:",
                    emailError.message
                );

                // Complaint already saved in MySQL.
                // Do not fail complaint submission
                // because email failed.

            }


            // =================================================
            // GET INSERTED COMPLAINT
            // =================================================

            const [newComplaintRows] =
                await pool.execute(

                    `SELECT
                        id,
                        complaint_type AS complaintType,
                        name,
                        department,
                        category,
                        complaint,
                        status,
                        created_at AS createdAt
                     FROM complaints
                     WHERE id = ?`,

                    [complaintId]

                );


            // =================================================
            // SUCCESS RESPONSE
            // =================================================

            return res.status(201).json({

                success: true,

                message:
                    "Complaint Submitted Successfully!",

                complaint:
                    newComplaintRows[0]

            });

        }

        catch (error) {

            console.error(
                "❌ Complaint Error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Server Error",

                error:
                    error.message

            });

        }

    }
);


// =====================================================
// GET - ALL COMPLAINTS
// GET /api/complaints
// =====================================================

router.get(
    "/complaints",
    async (req, res) => {

        try {

            const [complaints] =
                await pool.execute(

                    `SELECT
                        id,
                        complaint_type AS complaintType,
                        name,
                        department,
                        category,
                        complaint,
                        status,
                        created_at AS createdAt
                     FROM complaints
                     ORDER BY id DESC`

                );


            return res.status(200).json({

                success: true,

                totalComplaints:
                    complaints.length,

                complaints:
                    complaints

            });

        }

        catch (error) {

            console.error(
                "❌ Get Complaints Error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Could not get complaints",

                error:
                    error.message

            });

        }

    }
);


// =====================================================
// PUT - RESOLVE COMPLAINT
// PUT /api/complaints/:id
// =====================================================

router.put(
    "/complaints/:id",
    async (req, res) => {

        try {

            const id =
                Number(req.params.id);


            // =================================================
            // CHECK ID
            // =================================================

            if (
                !Number.isInteger(id) ||
                id <= 0
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid complaint ID"

                });

            }


            // =================================================
            // CHECK COMPLAINT EXISTS
            // =================================================

            const [existingRows] =
                await pool.execute(

                    `SELECT id
                     FROM complaints
                     WHERE id = ?`,

                    [id]

                );


            if (
                existingRows.length === 0
            ) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Complaint Not Found"

                });

            }


            // =================================================
            // UPDATE STATUS
            // =================================================

            await pool.execute(

                `UPDATE complaints
                 SET status = 'Resolved'
                 WHERE id = ?`,

                [id]

            );


            // =================================================
            // GET UPDATED COMPLAINT
            // =================================================

            const [updatedRows] =
                await pool.execute(

                    `SELECT
                        id,
                        complaint_type AS complaintType,
                        name,
                        department,
                        category,
                        complaint,
                        status,
                        created_at AS createdAt
                     FROM complaints
                     WHERE id = ?`,

                    [id]

                );


            return res.status(200).json({

                success: true,

                message:
                    "Complaint Resolved Successfully!",

                complaint:
                    updatedRows[0]

            });

        }

        catch (error) {

            console.error(
                "❌ Resolve Complaint Error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Could not resolve complaint",

                error:
                    error.message

            });

        }

    }
);


// =====================================================
// DELETE - DELETE COMPLAINT
// DELETE /api/complaints/:id
// =====================================================

router.delete(
    "/complaints/:id",
    async (req, res) => {

        try {

            const id =
                Number(req.params.id);


            // =================================================
            // CHECK ID
            // =================================================

            if (
                !Number.isInteger(id) ||
                id <= 0
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid complaint ID"

                });

            }


            // =================================================
            // CHECK COMPLAINT EXISTS
            // =================================================

            const [existingRows] =
                await pool.execute(

                    `SELECT id
                     FROM complaints
                     WHERE id = ?`,

                    [id]

                );


            if (
                existingRows.length === 0
            ) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Complaint Not Found"

                });

            }


            // =================================================
            // DELETE
            // =================================================

            await pool.execute(

                `DELETE FROM complaints
                 WHERE id = ?`,

                [id]

            );


            // =================================================
            // RETURN REMAINING COMPLAINTS
            // =================================================

            const [complaints] =
                await pool.execute(

                    `SELECT
                        id,
                        complaint_type AS complaintType,
                        name,
                        department,
                        category,
                        complaint,
                        status,
                        created_at AS createdAt
                     FROM complaints
                     ORDER BY id DESC`

                );


            return res.status(200).json({

                success: true,

                message:
                    "Complaint Deleted Successfully!",

                complaints:
                    complaints

            });

        }

        catch (error) {

            console.error(
                "❌ Delete Complaint Error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Could not delete complaint",

                error:
                    error.message

            });

        }

    }
);


// =====================================================
// EXPORT
// =====================================================

module.exports = router;