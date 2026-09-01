import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">

            {/* Logo */}
            <Link to="/" className="logo">
                <span className="logo-icon">🎤</span>
                <span>Campus Voice</span>
            </Link>


            {/* Navigation Links */}
            <div className="nav-links">

                <Link to="/">Home</Link>

                <Link to="/about">About</Link>

                <Link to="/complaint">Complaint</Link>

                <Link to="/contact">Contact</Link>

            </div>

        </nav>
    );
}

export default Navbar;