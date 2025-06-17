import React from "react";
import './bookingpage.css';
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import BookingForm from "./bookingForm";
import { useBooking } from "../context/bookingContext";

function BookingPage() {

  const { availableTimes, dispatch, submitForm, bookings } = useBooking();

  const location = useLocation();
  const initialBooking = location.state || {};

    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      };

  return (
    <>
      <section
        className="hero-section"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/restaurant.jpg)`,
        }}
      >
        <div className="container hero-layout">
          <motion.div
            className="hero-text"
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
            <motion.h1 variants={fadeIn}>Reservations</motion.h1>
            <motion.h2 variants={fadeIn}>Little Lemon</motion.h2>
            <motion.p variants={fadeIn}>Find a table for any occasion</motion.p>
          </motion.div>
          <img
            src="images/restauranfood1.jpg"
            alt="Hero img"
            className="hero-image"
          />
        </div>
      </section>

      <section className="booking-page">
         <motion.div className="booking-container"
         initial={{ opacity: 0, y: 40 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}>
            <BookingForm
              availableTimes={availableTimes}
              dispatch={dispatch}
              submitForm={submitForm}
              bookings={bookings}
              initialBooking={initialBooking}
            />
         </motion.div>
         </section>
    </>
  );
}

export default BookingPage;