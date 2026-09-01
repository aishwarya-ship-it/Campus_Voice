import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // ================================
    // ADMIN LOGIN
    // ================================

    const handleLogin = (e) => {
        e.preventDefault();

        setError("");

        // Empty field validation
        if (!username.trim() || !password.trim()) {
            setError("Please enter username and password");
            return;
        }

        // Admin credentials
        if (
            username === "admin" &&
            password === "admin123"
        ) {
            // Save login status
            localStorage.setItem(
                "adminLoggedIn",
                "true"
            );

            alert("Admin Login Successful!");

            // Go to dashboard
            navigate("/admin");
        } else {
            setError("Invalid Username or Password!");

            // Clear password
            setPassword("");
        }
    };

    return (
        <div className="admin-login">

            <div className="login-box">

                <h1>Admin Login</h1>

                <p>
                    Login to access the Admin Dashboard
                </p>

                <form onSubmit={handleLogin}>

                    {/* Username */}

                    <label>
                        Username
                    </label>

                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setError("");
                        }}
                    />

                    {/* Password */}

                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError("");
                        }}
                    />

                    {/* Error */}

                    {error && (
                        <p className="login-error">
                            {error}
                        </p>
                    )}

                    {/* Login Button */}

                    <button type="submit">
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AdminLogin;