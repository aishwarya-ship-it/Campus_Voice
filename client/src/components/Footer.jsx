function Footer() {
    return (
        <footer className="footer">

            <div className="footer-content">

                {/* =========================
                    BRAND
                ========================= */}

                <div className="footer-brand">

                    <h2>
                        Campus Voice
                    </h2>

                    <p>
                        A simple platform for students
                        to raise their concerns and make
                        their campus a better place.
                    </p>

                </div>


                {/* =========================
                    QUICK LINKS
                ========================= */}

                <div className="footer-links">

                    <h3>
                        Quick Links
                    </h3>

                    <a href="/">
                        Home
                    </a>

                    <a href="/about">
                        About
                    </a>

                    <a href="/complaint">
                        Register Complaint
                    </a>

                    <a href="/contact">
                        Contact
                    </a>

                </div>


                {/* =========================
                    CONTACT
                ========================= */}

                <div className="footer-contact">

                    <h3>
                        Contact
                    </h3>

                    <p>
                        campusvoice321@gmail.com
                    </p>

                    <p>
                        Student Complaint Support
                    </p>

                </div>

            </div>


            {/* =========================
                COPYRIGHT
            ========================= */}

            <div className="footer-bottom">

                <p>
                    © 2026 Campus Voice. All Rights Reserved.
                </p>

            </div>

        </footer>
    );
}

export default Footer;