function Home() {
    return (
        <>

            {/* =========================
                HERO SECTION
            ========================= */}

            <section className="hero">

                <div className="hero-content">

                    <p className="section-label">
                        CAMPUS VOICE
                    </p>

                    <h1>
                        Your Voice.
                        <br />
                        Your Campus.
                    </h1>

                    <p>
                        A simple and secure platform for students
                        to raise their concerns and make their
                        campus a better place.
                    </p>

                    <a
                        href="/complaint"
                        className="hero-button"
                    >
                        Register a Complaint
                    </a>

                </div>

            </section>


            {/* =========================
                INTRODUCTION
            ========================= */}

            <section className="home-section">

                <p className="section-label">
                    ABOUT CAMPUS VOICE
                </p>

                <h2>
                    Every Student Deserves
                    to Be Heard
                </h2>

                <p>
                    Campus Voice provides students with a simple
                    digital platform to submit their concerns.
                    Whether it is an academic issue, library
                    problem, transport concern or infrastructure
                    issue, students can easily raise their voice.
                </p>

            </section>


            {/* =========================
                FEATURES
            ========================= */}

            <section className="features">

                <div className="feature-card">

                    <h3>
                        Easy Complaint Submission
                    </h3>

                    <p>
                        Submit your complaint through a simple
                        and easy-to-use online form.
                    </p>

                </div>


                <div className="feature-card">

                    <h3>
                        Anonymous Complaints
                    </h3>

                    <p>
                        Campus-related complaints can be submitted
                        without revealing your name.
                    </p>

                </div>


                <div className="feature-card">

                    <h3>
                        Quick Notification
                    </h3>

                    <p>
                        Administrators receive email notifications
                        when a new complaint is submitted.
                    </p>

                </div>

            </section>


            {/* =========================
                HOW IT WORKS
            ========================= */}

            <section className="home-section">

                <p className="section-label">
                    HOW IT WORKS
                </p>

                <h2>
                    Raise Your Concern in
                    Three Simple Steps
                </h2>

            </section>


            <section className="features">

                <div className="feature-card">

                    <h3>
                        01. Submit
                    </h3>

                    <p>
                        Select your complaint type, department,
                        category and describe your concern.
                    </p>

                </div>


                <div className="feature-card">

                    <h3>
                        02. Notify
                    </h3>

                    <p>
                        Your complaint is securely stored and
                        the administrator receives an email alert.
                    </p>

                </div>


                <div className="feature-card">

                    <h3>
                        03. Resolve
                    </h3>

                    <p>
                        The administrator reviews the complaint
                        and updates its status after resolving it.
                    </p>

                </div>

            </section>


            {/* =========================
                FINAL CTA
            ========================= */}

            <section className="about-cta">

                <h2>
                    Have a Concern?
                </h2>

                <p>
                    Don't keep your concern unheard.
                    Register your complaint through Campus Voice.
                </p>

                <a
                    href="/complaint"
                    className="cta-button"
                >
                    Register Complaint
                </a>

            </section>

        </>
    );
}

export default Home;