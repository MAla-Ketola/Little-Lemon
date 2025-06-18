import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Calendar, Users, Clock, Wine } from "lucide-react";
import { useMemo } from "react";
import "./bookingpage.css";
import { useBooking } from "../context/bookingContext";
import { useForm } from "react-hook-form";
import { DateField } from "../components/DateField";
import { SelectField } from "../components/SelectField";

function BookingForm() {
  const { availableTimes, dispatch, bookings, submitForm } = useBooking();
  const location = useLocation();
  const initialBooking = location.state || {};
  const navigate = useNavigate();
  const todayString = new Date().toISOString().split("T")[0];

  const defaultValues = useMemo(
    () => ({
      date: initialBooking.date || todayString,
      time: initialBooking.time || "",
      guests: initialBooking.guests || "",
      occasion: initialBooking.occasion || "",
      seating: initialBooking.seating || "inside",
      comments: initialBooking.comments || "",
    }),
    [initialBooking, todayString]
  );
  const otherBookings = useMemo(
    () => bookings.filter((b) => b.id !== initialBooking.id),
    [bookings, initialBooking.id]
  );

  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors, isValid, touchedFields },
  } = useForm({
    mode: "all",
    defaultValues,
  });

  const watchedDate = watch("date");
  const watchedTime = watch("time");

  // Recalculate available times when date or bookings change
  useEffect(() => {
    dispatch({
      type: "UPDATE_TIMES",
      date: new Date(watchedDate),
      existingBookings: otherBookings,
      currentBookingTime: initialBooking.time,
    });
  }, [watchedDate, bookings, initialBooking.time, dispatch, otherBookings]);

  const onSubmit = (values) => {
    const payload = { ...initialBooking, ...values };
    const saved = submitForm(payload);
    if (!saved) {
      alert("Sorry—couldn't proceed to contact info. Please try again.");
      return;
    }
    navigate("/booking/contact", { state: saved });
  };

  const onError = (fieldErrors) => {
    const firstError = Object.keys(fieldErrors)[0];
    setFocus(firstError);
  };

  return (
    <form
      className="booking-form"
      onSubmit={handleSubmit(onSubmit, onError)}
      noValidate
    >
      <div className="booking-grid">
        <div className="form-group">
          <div className="input-icon">
            <Calendar size={20} className="icon" />
            <DateField
              register={register}
              error={errors.date?.message}
              todayString={todayString}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="input-icon">
            <Clock size={20} className="icon" />
            <SelectField
              id="time"
              label="Time"
              register={register}
              validation={{ required: "Please select a time" }}
              error={errors.time?.message}
              options={availableTimes.map((t) => ({ value: t, label: t }))}
              placeholder="Select time"
            />
          </div>
        </div>

        <div className="form-group">
          <div className="input-icon">
            <Users size={20} className="icon" />
            <SelectField
              id="guests"
              label="Guests"
              icon={Users}
              register={register}
              validation={{ required: "Number of guests required" }}
              error={errors.guests?.message}
              options={Array.from({ length: 10 }, (_, i) => ({
                value: i + 1,
                label: `${i + 1}`,
              }))}
              placeholder="Select number"
            />
          </div>
        </div>

        <div className="form-group">
          <div className="input-icon">
            <Wine size={20} className="icon" />
            <SelectField
              id="occasion"
              label="Occasion"
              icon={Wine}
              register={register}
              validation={{ required: "Please pick an occasion" }}
              error={errors.occasion?.message}
              options={[
                { value: "Birthday", label: "Birthday" },
                { value: "Anniversary", label: "Anniversary" },
                { value: "Other", label: "Other" },
              ]}
              placeholder="Select occasion"
            />
          </div>
        </div>
      </div>

      <fieldset className="form-group">
        <legend className="label">Seating options</legend>
        <div
          className="radio-group"
          role="radiogroup"
          aria-label="Seating options"
        >
          <label>
            <input type="radio" value="inside" {...register("seating")} />{" "}
            Inside
          </label>
          <label>
            <input type="radio" value="outside" {...register("seating")} />{" "}
            Outside
          </label>
        </div>
      </fieldset>

      <div className="form-group">
        <label htmlFor="comments">Additional Comments (Optional)</label>
        <textarea
          id="comments"
          {...register("comments")}
          placeholder="Let us know if you have any special requests..."
        />
      </div>

      <div className="button-wrapper">
        <button 
        type="submit" 
        className={`cta-button full-width ${!isValid ? "disabled" : ""}`}>
          Let's go!
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
