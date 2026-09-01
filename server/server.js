require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const complaintRoutes = require("./routes/complaintRoutes");
const studentAuthRoutes = require("./routes/studentRoutes");

const app = express();


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());

app.use(express.json());


// =====================================================
// DATABASE CONNECTION
// =====================================================

connectDB();


// =====================================================
// ROUTES
// =====================================================

// Complaint APIs
app.use(
    "/api",
    complaintRoutes
);


// Student Login APIs
app.use(
    "/api",
    studentAuthRoutes
);


// =====================================================
// TEST ROUTE
// =====================================================

app.get("/", (req, res) => {

    res.json({

        success: true,

        message:
            "Campus Voice Server is running"

    });

});


// =====================================================
// SERVER
// =====================================================

const PORT =
    process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `🚀 Server running on port ${PORT}`
    );

});