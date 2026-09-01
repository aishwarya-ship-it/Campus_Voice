import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentLogin() {

    const navigate = useNavigate();

    const [studentId, setStudentId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    // =====================================================
    // STUDENT LOGIN
    // =====================================================

    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");


        // =================================================
        // EMPTY FIELD VALIDATION
        // =================================================

        if (
            !studentId.trim() ||
            !password.trim()
        ) {

            setError(
                "Please enter Student ID and Password"
            );

            return;
        }


        try {

            setLoading(true);


            // =================================================
            // LOGIN REQUEST
            // =================================================

            const response = await fetch(
                "http://localhost:5000/api/student/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        studentId:
                            studentId.trim(),

                        password:
                            password

                    })
                }
            );


            const data =
                await response.json();


            // =================================================
            // LOGIN FAILED
            // =================================================

            if (!response.ok || !data.success) {

                setError(
                    data.message ||
                    "Invalid Student ID or Password"
                );

                setPassword("");

                return;
            }


            // =================================================
            // LOGIN SUCCESS
            // =================================================

            localStorage.setItem(
                "studentLoggedIn",
                "true"
            );


            localStorage.setItem(
                "studentToken",
                data.token
            );


            localStorage.setItem(
                "studentData",
                JSON.stringify(data.student)
            );


            alert(
                `Welcome, ${data.student.name}!`
            );


            navigate("/complaint");

        }

        catch (error) {

            console.error(
                "Student login error:",
                error
            );

            setError(
                "Server error. Please try again."
            );

        }

        finally {

            setLoading(false);

        }

    };


    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="admin-login">

            <div className="login-box">

                <h1>
                    Student Login
                </h1>

                <p>
                    Login to submit your complaint
                </p>


                <form
                    onSubmit={handleLogin}
                >


                    {/* =================================================
                        STUDENT ID
                    ================================================= */}

                    <label>
                        Student ID / Register Number
                    </label>

                    <input
                        type="text"
                        placeholder="Enter Student ID"
                        value={studentId}
                        onChange={(e) => {

                            setStudentId(
                                e.target.value
                            );

                            setError("");

                        }}
                    />


                    {/* =================================================
                        PASSWORD
                    ================================================= */}

                    <label>
                        Password
                    </label>

                    <div className="password-wrapper">

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => {

                                setPassword(
                                    e.target.value
                                );

                                setError("");

                            }}
                        />

                        <button
                            type="button"
                            className="show-password-btn"
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                        >

                            {showPassword
                                ? "Hide"
                                : "Show"
                            }

                        </button>

                    </div>


                    {/* =================================================
                        ERROR
                    ================================================= */}

                    {error && (

                        <p className="login-error">
                            {error}
                        </p>

                    )}


                    {/* =================================================
                        LOGIN BUTTON
                    ================================================= */}

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"
                        }

                    </button>

                </form>

            </div>

        </div>

    );

}

export default StudentLogin;