import React, { useState, useEffect } from 'react';
import './bookingpage.css';

function BookingForm({ availableTimes, dispatch, submitForm, bookings, initialBooking = {} }) {
  // Compute today's date string in YYYY-MM_DD format
  const todayString = new Date().toISOString().split('T')[0];
  const otherBookings = bookings.filter((b) => b.id !== initialBooking.id);

  // 1) Local state for all form fields except availableTimes
  const [date, setDate] = useState(initialBooking.date || todayString);
  const [time, setTime] = useState(initialBooking.time || '');
  const [guests, setGuests] = useState(initialBooking.guests || '');
  const [occasion, setOccasion] = useState(initialBooking.occasion || '');
  const [seating, setSeating] = useState(initialBooking.seating || 'inside');
  const [comments, setComments] = useState(initialBooking.comments || '');

    // Dispatch initial load of times for today's date
  useEffect(() => {
    dispatch({ type: 'UPDATE_TIMES', date: new Date(date), existingBookings: otherBookings });
  }, []);

    // on date-change:
  const handleDateChange = (e) => {
    const newDateString = e.target.value;
    setDate(newDateString);

    dispatch({
      type: "UPDATE_TIMES",
      date: new Date(newDateString),
      existingBookings: otherBookings,
    });
  };

const handleSubmit = (e) => {
    e.preventDefault();

    // include `id` so submitForm knows if it should update vs. add
    const formData = {
      id: initialBooking.id,
      date,
      time,
      guests,
      occasion,
      seating,
      comments,
    };

    const ok = submitForm(formData);
    if (!ok) {
      alert('Sorry, we couldn’t complete your booking. Please try again.');
    }
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="booking-grid">
        {/* --- Date */}
        <div className="form-group">
          <label htmlFor="res-date">Date</label>
          <input
             type="date"
            id="res-date"
            name="res-date"
            value={date}
            onChange={handleDateChange}
            required
          />
        </div>

        {/* --- Time field: options come from props.availableTimes --- */}
        <div className="form-group">
          <label htmlFor="res-time">Time</label>
          <select
            id="res-time"
            name="res-time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          >
            <option value="" disabled hidden>
              Select time
            </option>
            {availableTimes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* --- Number of guests --- */}
        <div className="form-group">
          <label htmlFor="guests">Number of Guests</label>
          <select
            id="guests"
            name="guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            required
          >
            <option value="" disabled hidden>
              Select number
            </option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        {/* --- Occasion field --- */}
        <div className="form-group">
          <label htmlFor="occasion">Occasion</label>
          <select
            id="occasion"
            name="occasion"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            required
          >
            <option value="" disabled hidden>
              Select occasion
            </option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
          </select>
        </div>
      </div>

      {/* --- Seating options --- */}
      <div className="form-group">
        <p className="label">Seating options</p>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="seating"
              value="inside"
              checked={seating === "inside"}
              onChange={(e) => setSeating(e.target.value)}
            />{" "}
            Inside
          </label>
          <label>
            <input
              type="radio"
              name="seating"
              value="outside"
              checked={seating === "outside"}
              onChange={(e) => setSeating(e.target.value)}
            />{" "}
            Outside
          </label>
        </div>
      </div>

      {/* --- Additional Comments --- */}
      <div className="form-group">
        <label htmlFor="comments">Additional Comments (Optional)</label>
        <textarea
          id="comments"
          name="comments"
          placeholder="Let us know if you have any special requests..."
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>

      <p className="form-note">
        You will receive a confirmation email shortly after booking. Please
        ensure your email is correct so we can send your reservation details.
      </p>

      <div className="button-wrapper">
        <button type="submit" className="cta-button full-width">
          Let’s go!
        </button>
      </div>
    </form>
  );
}

export default BookingForm;
