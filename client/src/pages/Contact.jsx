function Contact() {
    return (
        <>

            {/* =========================
                CONTACT HERO
            ========================= */}

            <section className="contact-hero">

                <div className="contact-hero-content">

                    <p className="section-label">
                        CONTACT US
                    </p>

                    <h1>
                        We’re Here
                        <br />
                        To Listen.
                    </h1>

                    <p>
                        Have a question, concern, or need help
                        with Campus Voice? Get in touch with us.
                    </p>

                </div>

            </section>


            {/* =========================
                CONTACT INFORMATION
            ========================= */}

            <section className="contact-section">

                <div className="contact-info">

                    <p className="section-label">
                        GET IN TOUCH
                    </p>

                    <h2>
                        Let’s Connect
                    </h2>

                    <p>
                        If you have any questions about Campus Voice,
                        its features, or the complaint process, feel
                        free to contact us.
                    </p>


                    <div className="contact-item">

                        <h3>
                            Email
                        </h3>

                        <p>
                            campusvoice321@gmail.com
                        </p>

                    </div>


                    <div className="contact-item">

                        <h3>
                            Phone
                        </h3>

                        <p>
                            +91 98765 43210
                        </p>

                    </div>


                    <div className="contact-item">

                        <h3>
                            Location
                        </h3>

                        <p>
                            Campus Voice
                            <br />
                            B.Sc Information Technology Department
                        </p>

                    </div>

                </div>


                {/* =========================
                    CONTACT FORM
                ========================= */}

                <div className="contact-form">

                    <h2>
                        Send Us a Message
                    </h2>


                    <form>

                        <label>
                            Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                        />


                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                        />


                        <label>
                            Subject
                        </label>

                        <input
                            type="text"
                            placeholder="Enter subject"
                        />


                        <label>
                            Message
                        </label>

                        <textarea
                            rows="6"
                            placeholder="Enter your message"
                        />


                        <button
                            type="submit"
                        >
                            Send Message
                        </button>

                    </form>

                </div>

            </section>


            {/* =========================
                FINAL CTA
            ========================= */}

            <section className="contact-cta">

                <h2>
                    Your Voice Matters.
                </h2>

                <p>
                    Campus Voice is built to make communication
                    between students and the administration easier.
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

export default Contact;