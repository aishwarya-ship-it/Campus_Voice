function About() {
    return (
        <>

            {/* =========================
                ABOUT HERO
            ========================= */}

            <section className="about-hero">

                <div className="about-hero-content">

                    <p className="section-label">
                        ABOUT US
                    </p>

                    <h1>
                        Giving Students
                        <br />
                        A Voice.
                    </h1>

                    <p>
                        Campus Voice is a student-focused complaint
                        management platform designed to make it
                        easier for students to share their concerns.
                    </p>

                </div>

            </section>


            {/* =========================
                OUR PURPOSE
            ========================= */}

            <section className="about-purpose">

                <div className="about-purpose-image">

                    <img
                        src="/college.jpeg"
                        alt="College Campus"
                    />

                </div>


                <div className="about-purpose-content">

                    <p className="section-label">
                        OUR PURPOSE
                    </p>

                    <h2>
                        A Better Way to
                        Communicate Concerns
                    </h2>

                    <p>
                        Students may sometimes face academic,
                        infrastructure, transport, library, hostel,
                        fee-related or other campus concerns.
                    </p>

                    <p>
                        Campus Voice provides a simple digital platform
                        where these concerns can be submitted and
                        managed efficiently.
                    </p>

                </div>

            </section>


            {/* =========================
                HOW IT WORKS
            ========================= */}

            <section className="about-process">

                <div className="about-section-heading">

                    <p className="section-label">
                        HOW IT WORKS
                    </p>

                    <h2>
                        Simple. Clear. Effective.
                    </h2>

                </div>


                <div className="process-grid">


                    <div className="process-card">

                        <span>
                            01
                        </span>

                        <h3>
                            Submit
                        </h3>

                        <p>
                            Students submit their complaint
                            through the complaint form.
                        </p>

                    </div>


                    <div className="process-card">

                        <span>
                            02
                        </span>

                        <h3>
                            Notify
                        </h3>

                        <p>
                            The administrator receives an
                            email notification about the complaint.
                        </p>

                    </div>


                    <div className="process-card">

                        <span>
                            03
                        </span>

                        <h3>
                            Resolve
                        </h3>

                        <p>
                            The administrator reviews the complaint
                            and updates its status when resolved.
                        </p>

                    </div>


                </div>

            </section>


            {/* =========================
                COMPLAINT TYPES
            ========================= */}

            <section className="about-types">

                <div>

                    <p className="section-label">
                        COMPLAINT TYPES
                    </p>

                    <h2>
                        Designed Around
                        Student Privacy
                    </h2>

                </div>


                <div className="type-grid">


                    <div className="type-card">

                        <h3>
                            Campus Complaint
                        </h3>

                        <p>
                            Students can submit campus-related
                            concerns anonymously without providing
                            their name.
                        </p>

                        <strong>
                            Anonymous
                        </strong>

                    </div>


                    <div className="type-card">

                        <h3>
                            Personal Complaint
                        </h3>

                        <p>
                            Students can submit personal concerns
                            with their name when identification is
                            required.
                        </p>

                        <strong>
                            Name Required
                        </strong>

                    </div>


                </div>

            </section>


            {/* =========================
                FINAL CTA
            ========================= */}

            <section className="about-cta">

                <h2>
                    Have something to share?
                </h2>

                <p>
                    Your concern matters. Let Campus Voice
                    help bring it to the right attention.
                </p>

                <a
                    href="/complaint"
                    className="cta-button"
                >
                    Register a Complaint
                </a>

            </section>

        </>
    );
}

export default About;