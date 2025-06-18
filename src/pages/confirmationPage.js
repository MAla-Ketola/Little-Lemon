import React, { useState } from "react";
import "./confirmationPage.css";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useBooking } from "../context/bookingContext";

function ConfirmationPage() {
  const { cancelBooking } = useBooking();

  const [isCancelled, setIsCancelled] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {emailSent, ...data} = location.state || {};

  const formattedDate = data.date
    ? new Date(data.date).toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  if (isCancelled) {
    return (
      <section className="cancel-page">
        <div className="cancel-container">
          <h1>Reservation Cancelled</h1>
          <p className="reservation">
            Your reservation for {formattedDate} at {data.time} has been
            cancelled.
          </p>
          <p>
            We’d love to see you another time! Feel free to browse our menu or
            make a new booking.
          </p>
          <button className="cta-button" onClick={() => navigate("/")}>
            Go Home
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="confirmation-page">
      <motion.div
        className="confirmation-container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      >
        <h1>Reservation Confirmed!</h1>
        {emailSent && (
        <p>
          A confirmation email has been sent to <strong>{data.email}</strong>.
        </p>
        )}

        <div className="summary-box">
          <h3>Summary</h3>
          <table>
            <tbody>
              <tr>
                <td>Date</td>
                <td>{formattedDate}</td>
              </tr>
              <tr>
                <td>Time</td>
                <td>{data.time}</td>
              </tr>
              <tr>
                <td>Guests</td>
                <td>{data.guests}</td>
              </tr>
              <tr>
                <td>Seating</td>
                <td>{data.seating}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>Thank you for choosing Little Lemon!</p>

        <div className="confirmation-actions">
          <Link to="/booking" state={data} className="button-wrapper">
            <button className="cta-button full-width" aria-label="On Click">
              Modify
            </button>
          </Link>

          <div className="button-wrapper">
            <button
              className="cta-button full-width"
              aria-label="On Click"
              onClick={() => setConfirming(true)}
            >
              Cancel Reservation
            </button>
          </div>
        </div>

        {confirming && (
          <div className="confirm-overlay">
            <div className="confirm-box">
              <p>Are you sure you want to cancel?</p>
              <button
                className="cta-button"
                onClick={() => {
                  cancelBooking(data.id);
                  setConfirming(false);
                  setIsCancelled(true);
                }}
              >
                Yes, cancel reservation
              </button>
              <button
                className="cta-button"
                onClick={() => setConfirming(false)}
              >
                No, keep reservation
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}

export default ConfirmationPage;
