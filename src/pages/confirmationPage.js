import React, { useState } from "react";
import './confirmationPage.css';
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";

function ConfirmationPage({cancelBooking}) {
  const [isCancelled, setIsCancelled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state || {};

  const handleCancel = () => {
    cancelBooking(data.id);
    setIsCancelled(true);

    setTimeout(() => navigate("/"), 3000);
  }

    const formattedDate = data.date
    ? new Date(data.date).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })
    : "";

  if(isCancelled) {
    return (
      <section className="cancel-page">
        <div className="cancel-container">
        <h1>Reservation Cancelled</h1>
        <p className="reservation">Your reservation for {data.date} at {data.time} has been cancelled.</p>
        <p>Redirecting you back to the homepage…</p>
        </div>
      </section>
    )
  }

  return (
    <section className="confirmation-page">
    <motion.div className="confirmation-container"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}>
      <h1>Reservation Confirmed!</h1>
      <p>A confirmation email has been sent to <strong>emma@example.com</strong>.</p>

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
            <button className="cta-button full-width">Modify</button>
        </Link>

        <div className="button-wrapper">
            <button
            className="cta-button full-width"
            onClick={handleCancel}
            >Cancel</button>
        </div>
      </div>
    </motion.div>
  </section>
  );
}

export default ConfirmationPage;