import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router";

// Main.js

// 1) initializeTimes should always return whatever fetchAPI(today) yields
export function initializeTimes() {
  const today = new Date();
  return typeof window.fetchAPI === "function" ? window.fetchAPI(today) : [];
}

// 2) updateTimes now pulls `existingBookings` out of the action (defaulting to [])
//    then filters out any slots that have already been booked for that date.
export function updateTimes(state, action) {
  if (action.type !== "UPDATE_TIMES") {
    return state;
  }
  const { date, existingBookings = [], currentBookingTime } = action;

  const allSlots =
    typeof window.fetchAPI === "function" ? window.fetchAPI(date) : [];

  // Remove any times already in existingBookings for that exact date
  const bookedSlots = existingBookings
    .filter((b) => new Date(b.date).toDateString() === date.toDateString())
    .map((b) => b.time);

  let available = allSlots.filter((slot) => !bookedSlots.includes(slot));

  // If modifying a booking, re-include their current time if it was removed
  if (currentBookingTime && !available.includes(currentBookingTime)) {
    available.push(currentBookingTime);
    available.sort(); // optional
  }

  return available;
}

export default function Main({ children }) {
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    [],
    initializeTimes
  );

  const navigate = useNavigate();

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem("bookings");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  const submitForm = (formData) => {
    if (!window.submitAPI(formData)) return null;

    if (formData.id) {
      // --- Existing booking (modification) ---
      setBookings((prev) => {
        const previous = prev.find((b) => b.id === formData.id);
        const updated = prev.map((b) => (b.id === formData.id ? formData : b));

        if (
          previous &&
          (previous.date !== formData.date || previous.time !== formData.time)
        ) {
          dispatch({
            type: "UPDATE_TIMES",
            date: new Date(formData.date),
            existingBookings: updated.filter((b) => b.id !== formData.id),
          });
        }
        return updated;
      });
      return formData;
    } else {
      // --- New booking ---
      const bookingWithId = { ...formData, id: Date.now() };

      setBookings((prev) => [...prev, bookingWithId]);

      dispatch({
        type: "UPDATE_TIMES",
        date: new Date(bookingWithId.date),
        existingBookings: [...bookings, bookingWithId],
      });
      return bookingWithId;
    }
  };

  const cancelBooking = (bookingId) => {
    // 1) find the one being cancelled
    const cancelled = bookings.find((b) => b.id === bookingId);
    if (!cancelled) return;

    // 2) drop it from state
    const updated = bookings.filter((b) => b.id !== bookingId);
    setBookings(updated);

    // 3) immediately re-run UPDATE_TIMES for that date
    dispatch({
      type: "UPDATE_TIMES",
      date: new Date(cancelled.date),
      existingBookings: updated,
    });
  };

  return (
    <main>
      {/* Clone each child and pass availableTimes & dispatch via props */}
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          availableTimes,
          dispatch,
          submitForm,
          cancelBooking,
          bookings,
        })
      )}
    </main>
  );
}
