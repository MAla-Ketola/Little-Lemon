import React, { useEffect, useState, useRef } from "react";
import "./contactInfoPage.css";
import { motion } from "framer-motion";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

function ContactInfoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state || {};

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [postal, setPostal] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [agreed, setAgreed] = useState(false);

  const formRef = useRef(null);
  const [isValid, setIsValid] = useState(false);

  const formattedDate = booking.date
    ? new Date(booking.date).toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
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

    if(!isValid) return;

    // stop if any errors
    if (Object.keys(errors).length > 0) {
      return;
    }

    // proceed: navigate to confirmation, pass along all state
    navigate("/booking/contact/confirmation", {
      state: {
        firstName,
        lastName,
        email,
        phone,
        postal,
        day,
        month,
        agreed,
        ...booking,
      },
    });
  };

  return (
    <>
      {/* Top Booking Info Banner */}
      <section className="booking-banner">
        <div className="banner-content">
          <button className="back-button" onClick={() => navigate(-1)}>
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
            onSubmit={handleSubmit}>
              <label>First Name*</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={handleBlur("firstName")}
                className={
                  touched.firstName && errors.firstName ? "error-field" : ""
                }
                placeholder="First Name"
                required
              />
              {touched.firstName && errors.firstName && (
                <div className="error">{errors.firstName}</div>
              )}

              <label>Last Name*</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onBlur={handleBlur("lastName")}
                className={
                  touched.lastName && errors.lastName ? "error-field" : ""
                }
                placeholder="Last Name"
                required
              />
              {touched.lastName && errors.lastName && (
                <div className="error">{errors.lastName}</div>
              )}

              <label>Email Address*</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleBlur("email")}
                className={touched.email && errors.email ? "error-field" : ""}
                placeholder="Email Address"
                required
              />
              {touched.email && errors.email && (
                <div className="error">{errors.email}</div>
              )}

              <label>Phone Number*</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={handleBlur("phone")}
                className={touched.phone && errors.phone ? "error-field" : ""}
                placeholder="Phone Number"
                required
              />
              {touched.phone && errors.phone && (
                <div className="error">{errors.phone}</div>
              )}

              <label>Postal Code*</label>
              <input
                type="text"
                value={postal}
                onChange={(e) => setPostal(e.target.value)}
                onBlur={handleBlur("postal")}
                className={touched.postal && errors.postal ? "error-field" : ""}
                placeholder="Postal Code"
              />
              {touched.postal && errors.postal && (
                <div className="error">{errors.postal}</div>
              )}

              <label>Birthday</label>
              <div className="birthday-inputs">
                <input
                  type="number"
                  placeholder="dd"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  onBlur={handleBlur("day")}
                  min="1"
                  max="31"
                />
                <input
                  type="number"
                  placeholder="mm"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  onBlur={handleBlur("month")}
                  min="1"
                  max="12"
                />
              </div>
              {touched.day && touched.month && errors.birthday && (
                <div className="error">{errors.birthday}</div>
              )}

              <label>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  onBlur={handleBlur("agreed")}
                  required
                />
                I agree to the restaurant’s required policy*
              </label>
              {touched.agreed && errors.agreed && (
                <div className="error">{errors.agreed}</div>
              )}

                <button 
                type="submit" 
                onClick={handleSubmit}
                aria-label="On Click"
                className={`cta-button full-width ${!isValid ? "disabled" : ""}`}>
                  Reserve table
                </button>

            </form>
          </div>

          {/* Summary section */}
          <div className="contact-summary">
            <img src="/images/map.png" alt="Map" className="map-image" />
            <div className="summary-card">
              <h4>Little Lemon Chicago</h4>
              <p>Friday 27 February 2025</p>
              <p>18:00</p>
              <p>Party of 2</p>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}

export default ContactInfoPage;
