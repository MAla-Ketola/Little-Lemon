import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./bookingpage.css";

function BookingForm({
  availableTimes,
  dispatch,
  submitForm,
  bookings,
  initialBooking = {},
}) {
  // Compute today's date string in YYYY-MM_DD format
  const todayString = new Date().toISOString().split("T")[0];
  const otherBookings = bookings.filter((b) => b.id !== initialBooking.id);

  // 1) Local state for all form fields except availableTimes
  const [date, setDate] = useState(initialBooking.date || todayString);
  const [time, setTime] = useState(initialBooking.time || "");
  const [guests, setGuests] = useState(initialBooking.guests || "");
  const [occasion, setOccasion] = useState(initialBooking.occasion || "");
  const [seating, setSeating] = useState(initialBooking.seating || "inside");
  const [comments, setComments] = useState(initialBooking.comments || "");

  const formRef = useRef(null);
  const dateRef = useRef();
  const timeRef = useRef();
  const guestsRef = useRef();
  const occasionRef = useRef();
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();

  const [touched, setTouched] = useState({
    date: false,
    time: false,
    guests: false,
    occasion: false,
  });

  const errors = {};
  if (!date)     errors.date     = "Please select a reservation date.";
  if (!time)     errors.time     = "Please choose a time slot.";
  if (!guests)   errors.guests   = "Please select the number of guests.";
  if (!occasion) errors.occasion = "Please pick an occasion.";


  // Dispatch initial load of times for today's date
  useEffect(() => {
    dispatch({
      type: "UPDATE_TIMES",
      date: new Date(date),
      existingBookings: otherBookings,
    });
  }, []);

  useEffect(() => {
    if(formRef.current) {
      setIsValid(formRef.current.checkValidity());
    }
  }, [date, time, guests, occasion, seating]);

  const handleBlur = (field) => () => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

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
    setTouched({ date: true, time: true, guests: true, occasion: true });

    if (!isValid) {
      if (errors.date) {
        dateRef.current.focus();
      } else if (errors.time) {
        timeRef.current.focus();
      } else if (errors.guests) {
        guestsRef.current.focus();
      } else if (errors.occasion) {
        occasionRef.current.focus();
      }
      return;
    }

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
      alert("Sorry, we couldn’t complete your booking. Please try again.");
    }
  };

  const handleReset = () => {
    setDate(initialBooking.date || todayString);
    setTime(initialBooking.time || "");
    setGuests(initialBooking.guests || "");
    setOccasion(initialBooking.occasion || "");
    setSeating(initialBooking.seating || "inside");
    setComments(initialBooking.comments || "");

    dispatch({
      type: "UPDATE_TIMES",
      date: new Date(initialBooking.date || todayString),
      existingBookings: otherBookings,
    });
    setTouched({ date: false, time: false, guests: false, occasion: false });
  };

  return (
    <form ref={formRef} className="booking-form" onSubmit={handleSubmit}>
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
            min={todayString}
            ref={dateRef}
            className={touched.date && errors.date ? "error-field" : ""}
            onBlur={handleBlur("date")}
          />
          {touched.date && errors.date && (
            <label htmlFor="res-date" className="error" tabIndex={0}>
              {errors.date}
            </label>
          )}
        </div>

        {/* --- Time field: options come from props.availableTimes --- */}
        <div className="form-group">
          <label htmlFor="res-time">Time</label>
          <select
            id="res-time"
            name="res-time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            onBlur={handleBlur("time")}
            required
            className={touched.time && errors.time ? "error-field" : ""}
            ref={timeRef}
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
          {touched.time && errors.time && (
            <label htmlFor="res-time" className="error" tabIndex={0}>
              {errors.time}
            </label>
          )}
        </div>

        {/* --- Number of guests --- */}
        <div className="form-group">
          <label htmlFor="guests">Number of Guests</label>
          <select
            id="guests"
            name="guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            onBlur={handleBlur("guests")}
            required
            className={touched.guests && errors.guests ? "error-field" : ""}
            ref={guestsRef}
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
          {touched.guests && errors.guests && (
            <label htmlFor="res-guests" className="error" tabIndex={0}>
              {errors.guests}
            </label>
          )}
        </div>

        {/* --- Occasion field --- */}
        <div className="form-group">
          <label htmlFor="occasion">Occasion</label>
          <select
            id="occasion"
            name="occasion"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            onBlur={handleBlur("occasion")}
            required
            className={touched.occasion && errors.occasion ? "error-field" : ""}
            ref={occasionRef}
          >
            <option value="" disabled hidden>
              Select occasion
            </option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
          </select>
          {touched.occasion && errors.occasion && (
            <label htmlFor="res-occasion" className="error" tabIndex={0}>
              {errors.occasion}
            </label>
          )}
        </div>
      </div>

      {/* --- Seating options --- */}
      <fieldset className="form-group">
        <legend className="label">Seating options</legend>
        <div
          className="radio-group"
          role="radiogroup"
          aria-label="Seating options"
        >
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
      </fieldset>

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
        <button
          type="button"
          onClick={handleSubmit}
          aria-label="On Click"
          className={`cta-button full-width ${!isValid ? "disabled" : ""}`}
        >
          Let’s go!
        </button>

        {/*<button type="button" className="reset-button" onClick={handleReset}>
          Reset
        </button>*/}

        <button
          type="button"
          className="cancel-button"
          onClick={() => navigate("/")}
        >
          Go Back
        </button>
      </div>
    </form>
  );
}

export default BookingForm;
