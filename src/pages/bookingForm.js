import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './bookingpage.css';

function BookingForm({ availableTimes, dispatch }) {
  // 1) Local state for all form fields except availableTimes
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('');
  const [occasion, setOccasion] = useState('');
  const [seating, setSeating] = useState('inside');
  const [comments, setComments] = useState('');

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const formData = { date, time, guests, occasion, seating, comments };
    console.log('Submitting reservation data:', formData);

    // In a real app, submit to an API endpoint here.
    // Then navigate to a confirmation page, e.g.:
    // navigate('/booking/contact/confirmation');
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="booking-grid">
        {/* --- Date field: dispatch UPDATE_TIMES when changed --- */}
        <div className="form-group">
          <label htmlFor="res-date">Date</label>
          <input
            type="date"
            id="res-date"
            name="res-date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              // Dispatch an action to update availableTimes in Main
              dispatch({ type: 'UPDATE_TIMES', date: e.target.value });
            }}
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
              checked={seating === 'inside'}
              onChange={(e) => setSeating(e.target.value)}
            />{' '}
            Inside
          </label>
          <label>
            <input
              type="radio"
              name="seating"
              value="outside"
              checked={seating === 'outside'}
              onChange={(e) => setSeating(e.target.value)}
            />{' '}
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
        You will receive a confirmation email shortly after booking. Please ensure your email is correct so we can send your reservation details.
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
