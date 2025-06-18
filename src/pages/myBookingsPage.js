import React, { useState } from "react";
import { useBooking } from "../context/bookingContext";
import { useNavigate } from "react-router-dom";
import "./myBookingsPage.css";

export default function MyBookingsPage() {
  const { bookings, cancelBooking } = useBooking();
  const [email, setEmail] = useState("");
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResults(true);
  };

  const userBookings = bookings.filter(
    (b) => b.email?.toLowerCase() === email.toLowerCase()
  );

  return (
    <div className="my-bookings-page">
      <h1>My Bookings</h1>
      <form onSubmit={handleSubmit} className="email-form">
        <label htmlFor="user-email">Enter your confirmation email:</label>
        <input
          type="email"
          id="user-email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">View Bookings</button>
      </form>

      {showResults && (
        <div className="results">
          {userBookings.length > 0 ? (
            <ul className="booking-list">
              {userBookings.map((b) => (
                <li key={b.id} className="booking-item">
                  <span>
                    {new Date(b.date).toLocaleDateString()} @ {b.time} — {b.guests} Guest{b.guests > 1 ? "s" : ""}
                  </span>
                  <button
                    className="cancel-button"
                    onClick={() => cancelBooking(b.id)}
                  >
                    Cancel
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No bookings found for {email}.</p>
          )}
        </div>
      )}

      <button className="back-home" onClick={() => navigate("/")}>Home</button>
    </div>
  );
}
