import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Calendar, Users, Clock, Wine } from "lucide-react";
import { useMemo } from "react";
import "./bookingpage.css";
import { useBooking } from "../context/bookingContext";
import useFormFields from "../hooks/useFormFields";

function validateBooking(values) {
  const errors = {};
  if (!values.date) errors.date = "Please select a date";
  if (!values.time) errors.time = "Please select a time";
  if (!values.guests || values.guests < 1)
    errors.guests = "Number of guests required";
  if (!values.occasion) errors.occasion = "Please pick an occasion";
  return errors;
}

function BookingForm() {
  const { availableTimes, dispatch, bookings, submitForm } = useBooking();
  const location = useLocation();
  const initialBooking = location.state || {};
  const currentBookingTime = initialBooking.time;
  const navigate = useNavigate();

  // Compute today's date string in YYYY-MM_DD format
  const todayString = new Date().toISOString().split("T")[0];
  const otherBookings = useMemo(
    () => bookings.filter((b) => b.id !== initialBooking.id),
    [bookings, initialBooking.id]
  );

  const {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    setValues,
    setTouched,
    validateForm,
  } = useFormFields(
    {
      date: initialBooking.date || todayString,
      time: initialBooking.time || "",
      guests: initialBooking.guests || "",
      occasion: initialBooking.occasion || "",
      seating: initialBooking.seating || "inside",
      comments: initialBooking.comments || "",
    },
    validateBooking
  );

  const formRef = useRef(null);
  const dateRef = useRef();
  const timeRef = useRef();
  const guestsRef = useRef();
  const occasionRef = useRef();

  useEffect(() => {
    if (initialBooking.id) {
      validateForm();
    }
  }, []);

  // re-run UPDATE_TIMES on date change…
  useEffect(() => {
    dispatch({
      type: "UPDATE_TIMES",
      date: new Date(values.date),
      existingBookings: otherBookings,
      currentBookingTime,
    });
  }, [values.date, bookings, values.time]);

  const handleSubmit = (e) => {
    e.preventDefault();

    //navigate("/booking/contact", { state: formData });
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      if (validationErrors.date) {
        dateRef.current.focus();
      } else if (validationErrors.time) {
        timeRef.current.focus();
      } else if (validationErrors.guests) {
        guestsRef.current.focus();
      } else if (validationErrors.occasion) {
        occasionRef.current.focus();
      }
      return;
    }

    // build your booking payload (preserves id if editing)
    const payload = { ...initialBooking, ...values };

    // call submitForm → adds or updates in context, returns the saved booking (with id)
    const saved = submitForm(payload);
    if (!saved) {
      alert("Sorry—couldn’t proceed to contact info. Please try again.");
      return;
    }

    // navigate on success
    navigate("/booking/contact", { state: saved });
  };

  return (
    <form ref={formRef} className="booking-form" onSubmit={handleSubmit}>
      <div className="booking-grid">
        {/* --- Date */}
        <div className="form-group">
          <label htmlFor="res-date">Date</label>
          <div className="input-icon">
            <Calendar size={20} className="icon" />
            <input
              type="date"
              id="res-date"
              name="date"
              value={values.date}
              onChange={handleChange}
              required
              min={todayString}
              ref={dateRef}
              className={touched.date && errors.date ? "error-field" : ""}
              onBlur={handleBlur}
            />
          </div>
          {touched.date && errors.date && (
            <label htmlFor="res-date" className="error" tabIndex={0}>
              {errors.date}
            </label>
          )}
        </div>

        {/* --- Time field: options come from props.availableTimes --- */}
        <div className="form-group">
          <label htmlFor="time">Time</label>
          <div className="input-icon">
            <Clock size={20} className="icon" />
            <select
              id="time"
              name="time"
              value={values.time}
              onChange={handleChange}
              onBlur={handleBlur}
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
          </div>
          {touched.time && errors.time && (
            <label htmlFor="time" className="error" tabIndex={0}>
              {errors.time}
            </label>
          )}
        </div>

        {/* --- Number of guests --- */}
        <div className="form-group">
          <label htmlFor="guests">Number of Guests</label>
          <div className="input-icon">
            <Users size={20} className="icon" />
            <select
              id="guests"
              name="guests"
              value={values.guests}
              onChange={handleChange}
              onBlur={handleBlur}
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
          </div>
          {touched.guests && errors.guests && (
            <label htmlFor="res-guests" className="error" tabIndex={0}>
              {errors.guests}
            </label>
          )}
        </div>

        {/* --- Occasion field --- */}
        <div className="form-group">
          <label htmlFor="occasion">Occasion</label>
          <div className="input-icon">
            <Wine size={20} className="icon" />
            <select
              id="occasion"
              name="occasion"
              value={values.occasion}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={
                touched.occasion && errors.occasion ? "error-field" : ""
              }
              ref={occasionRef}
            >
              <option value="" disabled hidden>
                Select occasion
              </option>
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Other">Other</option>
            </select>
          </div>
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
              checked={values.seating === "inside"}
              onChange={handleChange}
            />{" "}
            Inside
          </label>
          <label>
            <input
              type="radio"
              name="seating"
              value="outside"
              checked={values.seating === "outside"}
              onChange={handleChange}
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
          value={values.comments}
          onChange={handleChange}
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
