import React, { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router';

// Main.js

// 1) initializeTimes should always return whatever fetchAPI(today) yields
export function initializeTimes() {
  const today = new Date();
  return typeof window.fetchAPI === 'function'
    ? window.fetchAPI(today)
    : [];
}

// 2) updateTimes now pulls `existingBookings` out of the action (defaulting to [])
//    then filters out any slots that have already been booked for that date.
export function updateTimes(state, action) {
  if (action.type !== 'UPDATE_TIMES') {
    return state;
  }
  const { date, existingBookings = [] } = action;

  const allSlots = typeof window.fetchAPI === 'function'
    ? window.fetchAPI(date)
    : [];

  // Remove any times already in existingBookings for that exact date
  const bookedSlots = existingBookings
    .filter((b) => new Date(b.date).toDateString() === date.toDateString())
    .map((b) => b.time);

   return allSlots.filter((slot) => !bookedSlots.includes(slot));
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
  if (!window.submitAPI(formData)) return false;

  if (formData.id) {
    // — modifying an existing booking —
    setBookings(prev =>
      prev.map(b => (b.id === formData.id ? formData : b))
    );
    // send the updated booking (with its id) into state:
    navigate("/booking/contact/confirmation", { state: formData });
  } else {
    // — brand-new booking — give it an ID _and_ use _that_ object for both storage and navigation
    const bookingWithId = { ...formData, id: Date.now() };
    setBookings(prev => [...prev, bookingWithId]);
    navigate("/booking/contact/confirmation", { state: bookingWithId });
  }

  return true;
};

  const cancelBooking = (bookingId) => {
    setBookings(prev => prev.filter(b => b.id !== bookingId));
  }

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