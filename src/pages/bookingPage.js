import React from "react";
import './bookingpage.css';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function BookingPage() {

    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      };

  return (
    <>
        <section className="hero-section" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/restaurant.jpg)` }}>
            <div className="container hero-layout">
                <motion.div className="hero-text"
                                     initial="hidden"
                                     animate="visible"
                                     variants={{
                                       hidden: {},
                                       visible: {
                                         transition: {
                                           staggerChildren: 0.2,
                                         },
                                       },
                                     }}
                                   >
                                     <motion.h1 variants={fadeIn}>Little Lemon</motion.h1>
                                     <motion.h2 variants={fadeIn}>Chicago</motion.h2>
                                     <motion.p variants={fadeIn}>Find a table for any occasion</motion.p>
                    </motion.div>
                <img src="images/restauranfood1.jpg" alt="Hero img" className="hero-image"/>
            </div>
        </section>

        <section className="booking-page">
        <motion.div className="booking-container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}>
            <form className="booking-form">
                <div className="booking-grid">
                    <div className="form-group">
                        <label htmlFor="res-date">Date</label>
                        <input type="date" id="res-date" name="res-date" required></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="res-time">Time</label>
                        <select id="res-time" name="res-time" required>
                            <option value="" disabled hidden>Select time</option>
                            <option>18:00</option>
                            <option>19:00</option>
                            <option>20:00</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="guests">Number of Guests</label>
                        <select id="guests" name="guests" required>
                            <option value="" disabled hidden>Select guests</option>
                            {[...Array(10)].map((_, i) => (
                            <option key={i + 1}>{i + 1}</option>))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="occasion">Occasion</label>
                        <select id="occasion" name="occasion" required>
                            <option value="" disabled hidden>Select occasion</option>
                            <option>Birthday</option>
                            <option>Anniversary</option>
                        </select>
                    </div>
                </div>

                {/* Seating options */}
                <div className="form-group">
                    <p className="label">Seating options</p>
                    <div className="radio-group">
                        <label>
                            <input type="radio" name="seating" value="inside" /> Inside
                        </label>
                        <label>
                            <input type="radio" name="seating" value="outside" /> Outside
                        </label>
                    </div>
                </div>

                {/* Additional comments */}
                <div className="form-group">
                    <label htmlFor="comments">Additional Comments (Optional)</label>
                    <textarea
                    id="comments"
                    name="comments"
                    placeholder="Let us know if you have any special requests, dietary restrictions, or seating preferences"
                    />
                </div>

                {/* Note */}
                <p className="form-note">
                    You will receive a confirmation email shortly after booking. Please ensure your email is correct so we can send your reservation details.
                </p>

                {/* Submit button */}
                <Link to="/booking/contact" className="button-wrapper">
                    <button className="cta-button">Let’s go!</button>
                </Link>
                </form>
            </motion.div>
        </section>
    </>
  );
}

export default BookingPage;