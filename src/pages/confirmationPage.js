import React from "react";
import './confirmationPage.css';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function ConfirmationPage() {
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
              <td>27 Feb</td>
            </tr>
            <tr>
              <td>Time</td>
              <td>18:00</td>
            </tr>
            <tr>
              <td>Guests</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Seating</td>
              <td>Indoors</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>Thank you for choosing Little Lemon!</p>

      <div className="confirmation-actions">
        <Link to="/booking" className="button-wrapper">
            <button className="cta-button full-width">Modify</button>
        </Link>
        <Link to="/" className="button-wrapper">
            <button className="cta-button full-width">Cancel</button>
        </Link>
      </div>
    </motion.div>
  </section>
  );
}

export default ConfirmationPage;