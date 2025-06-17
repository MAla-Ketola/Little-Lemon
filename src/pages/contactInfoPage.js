import React, { useEffect, useState, useRef } from "react";
import "./contactInfoPage.css";
import { motion } from "framer-motion";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

function ContactInfoPage( {submitForm} ) {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state || {};

  const [firstName, setFirstName] = useState(booking.firstName ||"");
  const [lastName, setLastName] = useState(booking.lastName ||"");
  const [email, setEmail] = useState(booking.email ||"");
  const [phone, setPhone] = useState(booking.phone ||"");
  const [postal, setPostal] = useState(booking.postal ||"");
  const [day, setDay] = useState(booking.day ||"");
  const [month, setMonth] = useState(booking.month ||"");
  const [agreed, setAgreed] = useState(booking.agreed ||false);

  const formRef = useRef(null);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const postalRef = useRef();
  const dayRef = useRef();
  const monthRef = useRef();
  const agreedRef = useRef();
  const [isValid, setIsValid] = useState(false);

  const formattedDate = booking.date
    ? new Date(booking.date).toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric"
      })
    : "";

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    postal: false,
    day: false,
    month: false,
    agreed: false,
  });

  const errors = {};
  if (!firstName) errors.firstName = "First name is required.";
  if (!lastName) errors.lastName = "Last name is required.";
  if (!email) errors.email = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter a valid email.";
  if (!phone) errors.phone = "Phone number is required.";
  if (!postal) errors.postal = "Postal code is required.";
  if (!day || !month) errors.birthday = "Please enter your birthday.";
  if (!agreed) errors.agreed = "You must accept the policy.";

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  useEffect(() => {
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity());
    }
  }, [firstName, lastName, email, phone, postal, day, month, agreed]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // mark everything touched
    setTouched(
      Object.keys(touched).reduce((acc, f) => ({ ...acc, [f]: true }), {})
    );

    if (!isValid) {
      if (errors.firstName) {
        firstNameRef.current.focus();
      } else if (errors.lastName) {
        lastNameRef.current.focus();
      } else if (errors.email) {
        emailRef.current.focus();
      } else if (errors.phone) {
        phoneRef.current.focus();
      } else if (errors.postal) {
        postalRef.current.focus();
      } else if (errors.day) {
        dayRef.current.focus();
      } else if (errors.month) {
        monthRef.current.focus();
      } else if (errors.agreed) {
        agreedRef.current.focus();
      }
      return;
    }

    // stop if any errors
    if (Object.keys(errors).length > 0) {
      return;
    }

    // proceed: navigate to confirmation, pass along all state
    const formData = {
        ...booking,
        firstName,
        lastName,
        email,
        phone,
        postal,
        day,
        month,
        agreed,
      }

      const saved = submitForm(formData);
      if (!saved) {
      alert("Sorry—couldn’t complete your reservation. Please try again.");
      return;
    }

    // on success, navigate with the real `id` in state
    navigate("/booking/contact/confirmation", { state: saved });
  };

  return (
    <>
      {/* Top Booking Info Banner */}
      <section className="booking-banner">
        <div className="banner-content">
          <button className="back-button" onClick={() => navigate("/booking", {state: booking})}>
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
                name="res-firstName"
                value={firstName}
                ref={firstNameRef}
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={handleBlur("firstName")}
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
                name="res-lastName"
                value={lastName}
                ref={lastNameRef}
                onChange={(e) => setLastName(e.target.value)}
                onBlur={handleBlur("lastName")}
                className={
                  touched.lastName && errors.lastName ? "error-field" : ""
                }
                placeholder="Last Name"
                required
              />
              {touched.lastName && errors.lastName && (
                <label htmlFor="res-lastName" className="error" tabIndex={0}>{errors.lastName}</label>
              )}

              <label>Email Address*</label>
              <input
                type="email"
                id="res-email"
                name="res-email"
                value={email}
                ref={emailRef}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleBlur("email")}
                className={touched.email && errors.email ? "error-field" : ""}
                placeholder="Email Address"
                required
              />
              {touched.email && errors.email && (
                <label htmlFor="res-email" className="error" tabIndex={0}>{errors.email}</label>
              )}

              <label>Phone Number*</label>
              <input
                type="tel"
                id="res-phone"
                name="res-phone"
                value={phone}
                ref={phoneRef}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={handleBlur("phone")}
                className={touched.phone && errors.phone ? "error-field" : ""}
                placeholder="Phone Number"
                required
              />
              {touched.phone && errors.phone && (
                <label htmlFor="res-phone" className="error" tabIndex={0}>{errors.phone}</label>
              )}

              <label>Postal Code*</label>
              <input
                type="text"
                name="res-postal"
                id="res-postal"
                value={postal}
                ref={postalRef}
                onChange={(e) => setPostal(e.target.value)}
                onBlur={handleBlur("postal")}
                className={touched.postal && errors.postal ? "error-field" : ""}
                placeholder="Postal Code"
              />
              {touched.postal && errors.postal && (
                <label htmlFor="res-postal" className="error" tabIndex={0}>{errors.postal}</label>
              )}

              <label>Birthday</label>
              <div className="birthday-inputs">
                <input
                  type="number"
                  id="res-birthday"
                  name="res-birthday"
                  placeholder="dd"
                  value={day}
                  ref={dayRef}
                  onChange={(e) => setDay(e.target.value)}
                  onBlur={handleBlur("day")}
                  min="1"
                  max="31"
                />
                <input
                  type="number"
                  id="res-birthday"
                  name="res-birthday"
                  placeholder="mm"
                  value={month}
                  ref={monthRef}
                  onChange={(e) => setMonth(e.target.value)}
                  onBlur={handleBlur("month")}
                  min="1"
                  max="12"
                />
              </div>
              {touched.day && touched.month && errors.birthday && (
                <label htmlFor="res-birthday" className="error" tabIndex={0}>{errors.birthday}</label>
              )}

              <label>
                <input
                  type="checkbox"
                  id="res-agreed"
                  name="res-agreed"
                  checked={agreed}
                  ref={agreedRef}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className={
                    touched.agreed && errors.agreed ? "error-field" : ""
                  }
                  onBlur={handleBlur("agreed")}
                  required
                />
                I agree to the restaurant’s required policy*
              </label>
              {touched.agreed && errors.agreed && (
                <label htmlFor="res-agreed" className="error" tabIndex={0}>{errors.agreed}</label>
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
