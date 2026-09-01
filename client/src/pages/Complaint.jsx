import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Complaint() {

    const navigate = useNavigate();

    const [student, setStudent] = useState(null);

    const [complaintType, setComplaintType] = useState("");
    const [category, setCategory] = useState("");
    const [complaint, setComplaint] = useState("");

    const [loading, setLoading] = useState(false);


    // =====================================================
    // CHECK STUDENT LOGIN
    // =====================================================

    useEffect(() => {

        const loggedIn =
            localStorage.getItem("studentLoggedIn");

        const studentData =
            localStorage.getItem("studentData");

        const studentToken =
            localStorage.getItem("studentToken");


        if (
            loggedIn !== "true" ||
            !studentData ||
            !studentToken
        ) {

            navigate("/student-login");

            return;
        }


        try {

            const parsedStudent =
                JSON.parse(studentData);

            setStudent(parsedStudent);

        }

        catch (error) {

            console.error(
                "Student data error:",
                error
            );

            localStorage.clear();

            navigate("/student-login");

        }

    }, [navigate]);


    // =====================================================
    // STUDENT LOGOUT
    // =====================================================

    const handleLogout = () => {

        localStorage.removeItem(
            "studentLoggedIn"
        );

        localStorage.removeItem(
            "studentToken"
        );

        localStorage.removeItem(
            "studentData"
        );

        setStudent(null);

        navigate("/");

    };


    // =====================================================
    // SUBMIT COMPLAINT
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!student) {

            alert(
                "Please login as a student first."
            );

            navigate("/student-login");

            return;
        }


        const studentToken =
            localStorage.getItem("studentToken");


        if (!studentToken) {

            alert(
                "Student authentication expired. Please login again."
            );

            localStorage.clear();

            navigate("/student-login");

            return;
        }


        if (
            !complaintType ||
            !category ||
            !complaint.trim()
        ) {

            alert(
                "Please fill all required fields"
            );

            return;
        }


        const complaintData = {

            complaintType,

            name:
                student.name,

            department:
                student.department,

            category,

            complaint:
                complaint.trim()

        };


        try {

            setLoading(true);


            const response = await fetch(
                "http://localhost:5000/api/complaints/submit",
                {
                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            `Bearer ${studentToken}`

                    },

                    body:
                        JSON.stringify(
                            complaintData
                        )

                }
            );


            const data =
                await response.json();


            if (response.status === 401) {

                alert(
                    "Student session expired. Please login again."
                );

                localStorage.clear();

                navigate("/student-login");

                return;
            }


            if (data.success) {

                alert(
                    "Complaint Submitted Successfully!"
                );

                setComplaintType("");
                setCategory("");
                setComplaint("");

            }

            else {

                alert(
                    data.message ||
                    "Complaint submission failed"
                );

            }

        }

        catch (error) {

            console.error(
                "Complaint submission error:",
                error
            );

            alert(
                "Server error. Please try again."
            );

        }

        finally {

            setLoading(false);

        }

    };


    // =====================================================
    // WAIT FOR STUDENT
    // =====================================================

    if (!student) {

        return null;

    }


    return (

        <div className="complaint-container">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="complaint-header">

                <div>

                    <h1>
                        Register Complaint
                    </h1>

                    <p>
                        Submit your concern securely
                    </p>

                </div>


                <button
                    type="button"
                    className="student-logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>


            {/* =================================================
                STUDENT DETAILS
            ================================================= */}

            <div className="student-info">

                <h3>
                    Welcome, {student.name}
                </h3>

                <p>

                    <strong>
                        Student ID:
                    </strong>{" "}

                    {student.studentId}

                </p>

                <p>

                    <strong>
                        Department:
                    </strong>{" "}

                    {student.department}

                </p>

                <p>

                    <strong>
                        Year:
                    </strong>{" "}

                    {student.year}

                </p>

            </div>


            {/* =================================================
                COMPLAINT FORM
            ================================================= */}

            <form
                onSubmit={handleSubmit}
            >

                <label>
                    Complaint Type
                </label>

                <select
                    value={complaintType}
                    onChange={(e) =>
                        setComplaintType(
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        Select Complaint Type
                    </option>

                    <option value="Campus">
                        Campus Complaint
                    </option>

                    <option value="Personal">
                        Personal Complaint
                    </option>

                </select>


                <label>
                    Complaint Category
                </label>

                <select
                    value={category}
                    onChange={(e) =>
                        setCategory(
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        Select Category
                    </option>

                    <option value="Academic">
                        Academic
                    </option>

                    <option value="Transport">
                        Transport
                    </option>

                    <option value="Library">
                        Library
                    </option>

                    <option value="Hostel">
                        Hostel
                    </option>

                    <option value="Fees">
                        Fees
                    </option>

                    <option value="Infrastructure">
                        Infrastructure
                    </option>

                    <option value="Other">
                        Other
                    </option>

                </select>


                <label>
                    Complaint
                </label>

                <textarea
                    placeholder="Enter your complaint"
                    value={complaint}
                    onChange={(e) =>
                        setComplaint(
                            e.target.value
                        )
                    }
                    rows="6"
                />


                <button
                    type="submit"
                    disabled={loading}
                >

                    {loading
                        ? "Submitting..."
                        : "Submit Complaint"
                    }

                </button>

            </form>

        </div>

    );

}

export default Complaint;