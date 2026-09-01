import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
    const navigate = useNavigate();

    const [complaints, setComplaints] = useState([]);
    const [search, setSearch] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("All");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [loading, setLoading] = useState(true);

    // =====================================================
    // CHECK ADMIN LOGIN + GET COMPLAINTS
    // =====================================================

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("adminLoggedIn");

        if (isLoggedIn !== "true") {
            navigate("/admin-login");
            return;
        }

        fetchComplaints();
    }, [navigate]);

    // =====================================================
    // GET COMPLAINTS
    // =====================================================

    const fetchComplaints = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                "http://localhost:5000/api/complaints"
            );

            const data = await response.json();

            if (data.success) {
                setComplaints(
                    Array.isArray(data.complaints)
                        ? data.complaints
                        : []
                );
            } else {
                alert(
                    data.message ||
                    "Could not fetch complaints"
                );
            }
        } catch (error) {
            console.error(
                "Error fetching complaints:",
                error
            );

            alert(
                "Unable to connect to server"
            );
        } finally {
            setLoading(false);
        }
    };

    // =====================================================
    // DELETE COMPLAINT
    // =====================================================

    const deleteComplaint = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this complaint?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5000/api/complaints/${id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (data.success) {
                alert(
                    "Complaint Deleted Successfully!"
                );

                fetchComplaints();
            } else {
                alert(
                    data.message ||
                    "Could not delete complaint"
                );
            }
        } catch (error) {
            console.error(
                "Delete error:",
                error
            );

            alert(
                "Server error while deleting complaint"
            );
        }
    };

    // =====================================================
    // RESOLVE COMPLAINT
    // =====================================================

    const resolveComplaint = async (id) => {
        const confirmResolve = window.confirm(
            "Mark this complaint as Resolved?"
        );

        if (!confirmResolve) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5000/api/complaints/${id}`,
                {
                    method: "PUT"
                }
            );

            const data = await response.json();

            if (data.success) {
                alert(
                    "Complaint Resolved Successfully!"
                );

                fetchComplaints();
            } else {
                alert(
                    data.message ||
                    "Could not resolve complaint"
                );
            }
        } catch (error) {
            console.error(
                "Resolve error:",
                error
            );

            alert(
                "Server error while resolving complaint"
            );
        }
    };

    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = () => {
        localStorage.removeItem("adminLoggedIn");

        alert(
            "Admin Logged Out Successfully!"
        );

        navigate("/admin-login");
    };

    // =====================================================
    // SEARCH + FILTER
    // =====================================================

    const filteredComplaints = complaints.filter((item) => {
        const searchText = search
            .toLowerCase()
            .trim();

        const matchesSearch =
            (item.complaintType || "")
                .toLowerCase()
                .includes(searchText) ||

            (item.name || "")
                .toLowerCase()
                .includes(searchText) ||

            (item.department || "")
                .toLowerCase()
                .includes(searchText) ||

            (item.category || "")
                .toLowerCase()
                .includes(searchText) ||

            (item.complaint || "")
                .toLowerCase()
                .includes(searchText);

        const matchesDepartment =
            departmentFilter === "All" ||
            item.department === departmentFilter;

        const matchesCategory =
            categoryFilter === "All" ||
            item.category === categoryFilter;

        const matchesStatus =
            statusFilter === "All" ||
            item.status === statusFilter;

        return (
            matchesSearch &&
            matchesDepartment &&
            matchesCategory &&
            matchesStatus
        );
    });

    // =====================================================
    // UNIQUE DEPARTMENTS
    // =====================================================

    const departments = [
        ...new Set(
            complaints
                .map((item) => item.department)
                .filter(Boolean)
        )
    ];

    // =====================================================
    // UNIQUE CATEGORIES
    // =====================================================

    const categories = [
        ...new Set(
            complaints
                .map((item) => item.category)
                .filter(Boolean)
        )
    ];

    // =====================================================
    // DASHBOARD COUNTS
    // =====================================================

    const totalComplaints = complaints.length;

    const pendingComplaints = complaints.filter(
        (item) =>
            item.status === "Pending"
    ).length;

    const resolvedComplaints = complaints.filter(
        (item) =>
            item.status === "Resolved"
    ).length;

    // =====================================================
    // CLEAR FILTERS
    // =====================================================

    const clearFilters = () => {
        setSearch("");
        setDepartmentFilter("All");
        setCategoryFilter("All");
        setStatusFilter("All");
    };

    // =====================================================
    // UI
    // =====================================================

    return (
        <div className="admin-container">

            {/* =================================================
                ADMIN HEADER
            ================================================= */}

            <div className="admin-header">

                <div>
                    <h1>
                        Admin Dashboard
                    </h1>

                    <p>
                        Manage and monitor student complaints
                    </p>
                </div>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

            {/* =================================================
                DASHBOARD CARDS
            ================================================= */}

            <div className="dashboard-cards">

                <div className="dashboard-card">
                    <h3>
                        Total Complaints
                    </h3>

                    <p>
                        {totalComplaints}
                    </p>
                </div>

                <div className="dashboard-card">
                    <h3>
                        Pending
                    </h3>

                    <p>
                        {pendingComplaints}
                    </p>
                </div>

                <div className="dashboard-card">
                    <h3>
                        Resolved
                    </h3>

                    <p>
                        {resolvedComplaints}
                    </p>
                </div>

            </div>

            {/* =================================================
                SEARCH + FILTERS
            ================================================= */}

            <div className="admin-filters">

                <input
                    type="text"
                    placeholder="🔍 Search complaints..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <select
                    value={departmentFilter}
                    onChange={(e) =>
                        setDepartmentFilter(
                            e.target.value
                        )
                    }
                >
                    <option value="All">
                        All Departments
                    </option>

                    {departments.map(
                        (department) => (
                            <option
                                key={department}
                                value={department}
                            >
                                {department}
                            </option>
                        )
                    )}
                </select>

                <select
                    value={categoryFilter}
                    onChange={(e) =>
                        setCategoryFilter(
                            e.target.value
                        )
                    }
                >
                    <option value="All">
                        All Categories
                    </option>

                    {categories.map(
                        (category) => (
                            <option
                                key={category}
                                value={category}
                            >
                                {category}
                            </option>
                        )
                    )}
                </select>

                <select
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(
                            e.target.value
                        )
                    }
                >
                    <option value="All">
                        All Status
                    </option>

                    <option value="Pending">
                        Pending
                    </option>

                    <option value="Resolved">
                        Resolved
                    </option>
                </select>

            </div>

            {/* =================================================
                RESULT COUNT + CLEAR FILTER
            ================================================= */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px"
                }}
            >

                <p className="result-count">
                    Showing{" "}
                    <strong>
                        {filteredComplaints.length}
                    </strong>{" "}
                    complaint(s)
                </p>

                {(search !== "" ||
                    departmentFilter !== "All" ||
                    categoryFilter !== "All" ||
                    statusFilter !== "All") && (

                    <button
                        onClick={clearFilters}
                        style={{
                            border: "none",
                            background: "#64748b",
                            color: "white",
                            padding: "8px 15px",
                            borderRadius: "7px",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}
                    >
                        Clear Filters
                    </button>
                )}

            </div>

            {/* =================================================
                LOADING
            ================================================= */}

            {loading ? (

                <div
                    style={{
                        textAlign: "center",
                        padding: "50px",
                        color: "#64748b"
                    }}
                >
                    Loading complaints...
                </div>

            ) : (

                /* =================================================
                   COMPLAINT TABLE
                ================================================= */

                <div className="table-container">

                    <table>

                        <thead>

                            <tr>
                                <th>ID</th>
                                <th>Complaint Type</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Category</th>
                                <th>Complaint</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>

                        </thead>

                        <tbody>

                            {filteredComplaints.length > 0 ? (

                                filteredComplaints.map(
                                    (item, index) => (

                                        <tr
                                            key={
                                                item.id ??
                                                index
                                            }
                                        >

                                            {/* ID */}

                                            <td>
                                                {item.id ??
                                                    index + 1}
                                            </td>

                                            {/* COMPLAINT TYPE */}

                                            <td>
                                                <strong>
                                                    {
                                                        item.complaintType ||
                                                        "Campus"
                                                    }
                                                </strong>
                                            </td>

                                            {/* NAME */}

                                            <td>
                                                {
                                                    item.complaintType ===
                                                    "Personal"
                                                        ? (
                                                            item.name ||
                                                            "N/A"
                                                        )
                                                        : "Anonymous"
                                                }
                                            </td>

                                            {/* DEPARTMENT */}

                                            <td>
                                                {
                                                    item.department ||
                                                    "N/A"
                                                }
                                            </td>

                                            {/* CATEGORY */}

                                            <td>
                                                {
                                                    item.category ||
                                                    "N/A"
                                                }
                                            </td>

                                            {/* COMPLAINT */}

                                            <td
                                                style={{
                                                    maxWidth: "300px",
                                                    whiteSpace: "normal",
                                                    wordBreak:
                                                        "break-word"
                                                }}
                                            >
                                                {
                                                    item.complaint ||
                                                    "N/A"
                                                }
                                            </td>

                                            {/* STATUS */}

                                            <td>

                                                <span
                                                    className={
                                                        item.status ===
                                                        "Resolved"
                                                            ? "status-resolved"
                                                            : "status-pending"
                                                    }
                                                >
                                                    {
                                                        item.status ||
                                                        "Pending"
                                                    }
                                                </span>

                                            </td>

                                            {/* ACTIONS */}

                                            <td
                                                style={{
                                                    whiteSpace:
                                                        "nowrap"
                                                }}
                                            >

                                                {item.status !==
                                                    "Resolved" && (

                                                    <button
                                                        className="resolve-btn"
                                                        onClick={() =>
                                                            resolveComplaint(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        Resolve
                                                    </button>

                                                )}

                                                <button
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        deleteComplaint(
                                                            item.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )

                            ) : (

                                <tr>

                                    <td
                                        colSpan="8"
                                        style={{
                                            textAlign: "center",
                                            padding: "35px",
                                            color: "#64748b"
                                        }}
                                    >
                                        No complaints found
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    );
}

export default Admin;