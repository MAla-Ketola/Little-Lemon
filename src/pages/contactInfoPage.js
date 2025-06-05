import React from "react";
import "./contactInfoPage.css"
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

function ContactInfoPage() {

    const navigate = useNavigate();

  return (
    <>
        {/* Top Booking Info Banner */}
        <section className="booking-banner">
            <div className="banner-content">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <HiArrowLeft/>
                </button>
                <p>
                    <span/> Little Lemon Chicago
                    <span className="dot" />  Fri, 27 Feb – 18:00 – 2 Guests
                </p>
            </div>
        </section>

        <section className="contact-page">
            <motion.div className="contact-container"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            >
                <div className="contact-form-box">
                    <h3>Please complete this form to book your reservation.</h3>
                    <form className="contact-form">
                        <label>First Name*</label>
                        <input type="text" placeholder="First Name" required/>

                        <label>Last Name*</label>
                        <input type="text" placeholder="Last Name" required/>

                        <label>Email Address*</label>
                        <input type="email" placeholder="Email Address" required/>

                        <label>Phone Number*</label>
                        <input type="tel" placeholder="Phone Number" required/>

                        <label>Postal Code*</label>
                        <input type="text" placeholder="Postal Code"/>

                        <label>Birthday</label>
                        <div className="birthday-inputs">
                            <input type="number" placeholder="dd" min="1" max="31"/>
                            <input type="number" placeholder="mm" min="1" max="12"/>
                        </div>

                        <label>
                            <input type="checkbox" required/>
                            I agree to the restaurant’s required policy*
                        </label>

                        <Link to="/booking/contact/confirmation" className="button-wrapper">
                            <button type="submit" className="cta-button full-width">Reserve table</button>
                        </Link>
                    </form>
                </div>

                {/* Summary section */}
                <div className="contact-summary">
                    <img src="/images/map.png" alt="Map" className="map-image"/>
                    <div className="summary-card">
                        <h4>Little Lemon Chicago</h4>
                            <p>Friday 27 February 2025</p>
                            <p>18:00</p>
                            <p>Party of 2</p>
                    </div>
                </div>
            </motion.div>
        </section>
    </>
  );
}

export default ContactInfoPage;