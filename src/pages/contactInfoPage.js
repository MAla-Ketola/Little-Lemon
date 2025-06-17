import React, { useEffect, useState, useRef } from "react";
import "./contactInfoPage.css";
import { motion } from "framer-motion";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import { useBooking } from "../context/bookingContext";
import useFormFields from "../hooks/useFormFields";

// validator for contact info
function validateContact(values) {
  const errors = {};
  if (!values.firstName) errors.firstName = "First name required";
  if (!values.lastName) errors.lastName = "Last name required";
  if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = "Valid email required";
  if (!values.phone) errors.phone = "Phone number is required.";
  if (!values.postal) errors.postal = "Postal code is required.";
  if (!values.day || !values.month)
    errors.birthday = "Please enter your birthday.";
  if (!values.agreed) errors.agreed = "You must accept the policy.";
  return errors;
}

function ContactInfoPage() {
  const { submitForm } = useBooking();
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state || {};

  const {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    setValues,
    setTouched,
    validateForm
  } = useFormFields(
    {
      firstName: booking.firstName || "",
      lastName: booking.lastName || "",
      email: booking.email || "",
      phone: booking.phone || "",
      postal: booking.postal || "",
      day: booking.day || "",
      month: booking.month || "",
      agreed: booking.agreed || false,
    },
    validateContact
  );

  const formRef = useRef(null);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const postalRef = useRef();
  const dayRef = useRef();
  const monthRef = useRef();
  const agreedRef = useRef();

  const formattedDate = booking.date
    ? new Date(booking.date).toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
            if (validationErrors.firstName) {
        firstNameRef.current.focus();
      } else if (validationErrors.lastName) {
        lastNameRef.current.focus();
      } else if (validationErrors.email) {
        emailRef.current.focus();
      } else if (validationErrors.phone) {
        phoneRef.current.focus();
      } else if (validationErrors.postal) {
        postalRef.current.focus();
      } else if (validationErrors.day) {
        dayRef.current.focus();
      } else if (validationErrors.month) {
        monthRef.current.focus();
      } else if (validationErrors.agreed) {
        agreedRef.current.focus();
      }
      return;
    }

    const payload = { ...booking, ...values };
    const saved = submitForm(payload);
    if (saved) navigate("/booking/contact/confirmation", { state: saved });
  };

  return (
    <>
      {/* Top Booking Info Banner */}
      <section className="booking-banner">
        <div className="banner-content">
          <button
            className="back-button"
            onClick={() => navigate("/booking", { state: booking })}
          >
            <HiArrowLeft />
          </button>
          <p>
            <span /> Little Lemon Chicago
            <span className="dot" /> {formattedDate} – {booking.time} –{" "}
            {booking.guests} Guests
          </p>
        </div>
      </section>

      <section className="contact-page">
        <motion.div
          className="contact-container"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        >
          <div className="contact-form-box">
            <h3>Please complete this form to book your reservation.</h3>
            <form
              className="contact-form"
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <label>First Name*</label>
              <input
                type="text"
                id="res-firstName"
                name="firstName"
                value={values.firstName}
                ref={firstNameRef}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  touched.firstName && errors.firstName ? "error-field" : ""
                }
                placeholder="First Name"
                required
              />
              {touched.firstName && errors.firstName && (
                <label htmlFor="res-firstName" className="error" tabIndex={0}>
                  {errors.firstName}
                </label>
              )}

              <label>Last Name*</label>
              <input
                type="text"
                id="res-lastName"
                name="lastName"
                value={values.lastName}
                ref={lastNameRef}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  touched.lastName && errors.lastName ? "error-field" : ""
                }
                placeholder="Last Name"
                required
              />
              {touched.lastName && errors.lastName && (
                <label htmlFor="res-lastName" className="error" tabIndex={0}>
                  {errors.lastName}
                </label>
              )}

              <label>Email Address*</label>
              <input
                type="email"
                id="res-email"
                name="email"
                value={values.email}
                ref={emailRef}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.email && errors.email ? "error-field" : ""}
                placeholder="Email Address"
                required
              />
              {touched.email && errors.email && (
                <label htmlFor="res-email" className="error" tabIndex={0}>
                  {errors.email}
                </label>
              )}

              <label>Phone Number*</label>
              <input
                type="tel"
                id="res-phone"
                name="phone"
                value={values.phone}
                ref={phoneRef}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.phone && errors.phone ? "error-field" : ""}
                placeholder="Phone Number"
                required
              />
              {touched.phone && errors.phone && (
                <label htmlFor="res-phone" className="error" tabIndex={0}>
                  {errors.phone}
                </label>
              )}

              <label>Postal Code*</label>
              <input
                type="text"
                name="postal"
                id="res-postal"
                value={values.postal}
                ref={postalRef}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.postal && errors.postal ? "error-field" : ""}
                placeholder="Postal Code"
              />
              {touched.postal && errors.postal && (
                <label htmlFor="res-postal" className="error" tabIndex={0}>
                  {errors.postal}
                </label>
              )}

              <label>Birthday</label>
              <div className="birthday-inputs">
                <input
                  type="number"
                  id="res-birthday-day"
                  name="day"
                  placeholder="dd"
                  value={values.day}
                  ref={dayRef}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min="1"
                  max="31"
                />
                <input
                  type="number"
                  id="res-birthday-month"
                  name="month"
                  placeholder="mm"
                  value={values.month}
                  ref={monthRef}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min="1"
                  max="12"
                />
              </div>
              {touched.day && touched.month && errors.birthday && (
                <label htmlFor="res-birthday" className="error" tabIndex={0}>
                  {errors.birthday}
                </label>
              )}

              <label>
                <input
                  type="checkbox"
                  id="res-agreed"
                  name="agreed"
                  checked={values.agreed}
                  ref={agreedRef}
                  onChange={handleChange}
                  className={
                    touched.agreed && errors.agreed ? "error-field" : ""
                  }
                  onBlur={handleBlur}
                  required
                />
                I agree to the restaurant’s required policy*
              </label>
              {touched.agreed && errors.agreed && (
                <label htmlFor="res-agreed" className="error" tabIndex={0}>
                  {errors.agreed}
                </label>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                aria-label="On Click"
                className={`cta-button full-width ${
                  !isValid ? "disabled" : ""
                }`}
              >
                Confirm Reservation
              </button>
            </form>
          </div>

          {/* Summary section */}
          <div className="contact-summary">
            <img src="/images/map.png" alt="Map" className="map-image" />
            <div className="summary-card">
              <h4>Little Lemon Chicago</h4>
              <p>{formattedDate}</p>
              <p>Time: {booking.time}</p>
              <p>Guests: {booking.guests}</p>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}

export default ContactInfoPage;
