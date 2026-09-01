const jwt = require("jsonwebtoken");


// =====================================================
// STUDENT AUTHENTICATION MIDDLEWARE
// =====================================================

const studentAuth = (req, res, next) => {

    try {

        // Get Authorization header
        const authHeader =
            req.headers.authorization;


        // Check token exists
        if (!authHeader) {

            return res.status(401).json({

                success: false,

                message:
                    "Student authentication required"

            });
        }


        // Expected format:
        // Bearer TOKEN

        const parts =
            authHeader.split(" ");


        if (
            parts.length !== 2 ||
            parts[0] !== "Bearer"
        ) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid authentication format"

            });
        }


        const token =
            parts[1];


        // Verify JWT
        const decoded =
            jwt.verify(
                token,
                process.env.STUDENT_JWT_SECRET
            );


        // Store student ID
        // for later use in route
        req.studentId =
            decoded.studentId;


        // Continue to complaint route
        next();


    } catch (error) {

        console.error(
            "❌ Student Auth Error:",
            error.message
        );


        return res.status(401).json({

            success: false,

            message:
                "Invalid or expired student token"

        });

    }

};


module.exports = studentAuth;