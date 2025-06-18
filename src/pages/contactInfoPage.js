import "./contactInfoPage.css";
import { motion } from "framer-motion";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import { useBooking } from "../context/bookingContext";
import { useForm } from "react-hook-form";
import { TextField } from "../components/TextField";

const sendConfirmationEmail = (booking) => {
  return new Promise((resolve) => {
    //simulate network latency
    setTimeout(() => resolve(true), 500);
  })
}

const CONTACT_VALIDATION = {
  firstName: { required: "First name is required" },
  lastName: { required: "Last name is required" },
  email: {
    required: "Email is required",
    pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email" },
  },
  phone: { required: "Phone number is required" },
  postal: { required: "Postal code is required" },
  day: {
    required: "Day is required",
    min: { value: 1, message: "Invalid day" },
  },
  month: {
    required: "Month is required",
    min: { value: 1, message: "Invalid month" },
  },
  agreed: { required: "You must accept the policy" },
};

function ContactInfoPage() {
  const { submitForm } = useBooking();
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state || {};

  // defaultValues picks up any existing booking edits
  const defaultValues = {
    firstName: booking.firstName || "",
    lastName: booking.lastName || "",
    email: booking.email || "",
    phone: booking.phone || "",
    postal: booking.postal || "",
    day: booking.day || "",
    month: booking.month || "",
    agreed: booking.agreed || false,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setFocus,
  } = useForm({
    mode: "all",
    defaultValues,
  });

  const formattedDate = booking.date
    ? new Date(booking.date).toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  const handleError = (fieldErrors) => {
    const firstError = Object.keys(fieldErrors)[0];
    setFocus(firstError);
  };

  const onSubmit = async (vals) => {
    const saved = submitForm({ ...booking, ...vals });
    if (!saved) {
      alert("Sorry—couldn't complete your reservation.");
      return;
    }

    const emailSent = await sendConfirmationEmail(saved);

    navigate("/booking/contact/confirmation", {
      state: { ...saved, emailSent },
      });
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
            <span className="dot" /> {formattedDate} – {booking.time} – {" "}
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
              onSubmit={handleSubmit(onSubmit, handleError)}
              noValidate
            >
              <TextField
                id="firstName"
                label="First Name*"
                register={register}
                validation={CONTACT_VALIDATION.firstName}
                error={errors.firstName?.message}
                placeholder="First Name"
              />

              <TextField
                id="lastName"
                label="Last Name*"
                register={register}
                validation={CONTACT_VALIDATION.lastName}
                error={errors.lastName?.message}
                placeholder="Last Name"
              />

              <TextField
                id="email"
                label="Email*"
                register={register}
                validation={CONTACT_VALIDATION.email}
                error={errors.email?.message}
                placeholder="Email"
              />

              <TextField
                id="phone"
                label="Phone*"
                register={register}
                validation={CONTACT_VALIDATION.phone}
                error={errors.phone?.message}
                placeholder="Phone"
              />

              <TextField
                id="postal"
                label="Postal Code*"
                register={register}
                validation={CONTACT_VALIDATION.postal}
                error={errors.postal?.message}
                placeholder="Postal"
              />

              <label>Birthday*</label>
              <div className="birthday-inputs">
                <TextField
                  id="day"
                  label=""
                  type="number"
                  register={register}
                  validation={CONTACT_VALIDATION.day}
                  error={errors.day?.message}
                  placeholder="DD"
                  min={1}
                  max={31}
                />

                <TextField
                  id="month"
                  label=""
                  type="number"
                  register={register}
                  validation={CONTACT_VALIDATION.month}
                  error={errors.month?.message}
                  placeholder="MM"
                  min={1}
                  max={12}
                />
              </div>

              <div className="checkbox">
                <label className="checkbox-label">
                  <TextField
                    id="agreed"
                    type="checkbox"
                    register={register}
                    validation={CONTACT_VALIDATION.agreed}
                  />
                  I agree to the <Link to="/policy">terms and policy</Link>*
                </label>
                {errors.agreed && (
                  <span role="alert" className="error">
                    {errors.agreed.message}
                  </span>
                )}
              </div>

              <div className="button-wrapper">
                <button
                  type="submit"
                  className={`cta-button full-width ${
                    !isValid ? "disabled" : ""
                  }`}
                >
                  Confirm Reservation
                </button>
              </div>
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
