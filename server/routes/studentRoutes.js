const express = require("express");
const jwt = require("jsonwebtoken");

const { pool } = require("../config/db");

const router = express.Router();


// =====================================================
// STUDENT LOGIN
// POST /api/student/login
// =====================================================

router.post("/student/login", async (req, res) => {

    try {

        const {
            studentId,
            password
        } = req.body || {};


        // =================================================
        // CHECK EMPTY FIELDS
        // =================================================

        if (!studentId || !password) {

            return res.status(400).json({

                success: false,

                message:
                    "Student ID and Password are required"

            });

        }


        // =================================================
        // CLEAN INPUT
        // =================================================

        const enteredStudentId =
            studentId.trim().toUpperCase();

        const enteredPassword =
            password.trim();


        // =================================================
        // FIND STUDENT FROM MYSQL
        // =================================================

        const [rows] = await pool.execute(

            `SELECT
                student_id,
                name,
                department,
                year,
                email,
                password
             FROM students
             WHERE UPPER(TRIM(student_id)) = ?`,

            [enteredStudentId]

        );


        // =================================================
        // STUDENT NOT FOUND
        // =================================================

        if (rows.length === 0) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid Student ID or Password"

            });

        }


        const student = rows[0];


        // =================================================
        // CHECK PASSWORD
        // =================================================

        if (
            String(student.password).trim() !==
            enteredPassword
        ) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid Student ID or Password"

            });

        }


        // =================================================
        // CHECK DEPARTMENT
        // =================================================

        if (
            student.department !==
            "B.Sc Information Technology"
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "Student department is not eligible"

            });

        }


        // =================================================
        // CHECK YEAR
        // =================================================

        if (
            student.year !== "3rd Year"
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "Student year is not eligible"

            });

        }


        // =================================================
        // CHECK JWT SECRET
        // =================================================

        if (!process.env.STUDENT_JWT_SECRET) {

            console.error(
                "❌ STUDENT_JWT_SECRET is missing in .env"
            );

            return res.status(500).json({

                success: false,

                message:
                    "Student authentication configuration error"

            });

        }


        // =================================================
        // CREATE JWT TOKEN
        // =================================================

        const token = jwt.sign(

            {
                studentId:
                    student.student_id
            },

            process.env.STUDENT_JWT_SECRET,

            {
                expiresIn: "2h"
            }

        );


        // =================================================
        // LOGIN SUCCESS
        // =================================================

        console.log(
            `✅ Student Login Successful: ${student.student_id}`
        );


        return res.status(200).json({

            success: true,

            message:
                "Student Login Successful",

            token: token,

            student: {

                studentId:
                    student.student_id,

                name:
                    student.name,

                department:
                    student.department,

                year:
                    student.year,

                email:
                    student.email

            }

        });

    }


    // =====================================================
    // SERVER ERROR
    // =====================================================

    catch (error) {

        console.error(
            "❌ Student Login Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Server Error"

        });

    }

});


module.exports = router;