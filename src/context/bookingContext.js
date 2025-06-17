import React, { createContext, useContext, useReducer, useState, useEffect } from "react";
import { initializeTimes, updateTimes } from "../utils/times";

// 1. Create the Context
const BookingContext = createContext();

// 2. Provider component
export function BookingProvider({ children }) {
  // availableTimes reducer
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    [],
    initializeTimes
  );

  // bookings state (with localStorage persistence)
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem("bookings");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  // submitForm and cancelBooking exactly as you have them now
  const submitForm = (formData) => {
    if (!window.submitAPI(formData)) return null;

    if (formData.id) {
      setBookings((prev) => {
        const previous = prev.find((b) => b.id === formData.id);
        const updated = prev.map((b) =>
          b.id === formData.id ? formData : b
        );
        if (
          previous &&
          (previous.date !== formData.date ||
            previous.time !== formData.time)
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
    const cancelled = bookings.find((b) => b.id === bookingId);
    if (!cancelled) return;
    const updated = bookings.filter((b) => b.id !== bookingId);
    setBookings(updated);
    dispatch({
      type: "UPDATE_TIMES",
      date: new Date(cancelled.date),
      existingBookings: updated,
    });
  };

  return (
    <BookingContext.Provider
      value={{
        availableTimes,
        bookings,
        dispatch,
        submitForm,
        cancelBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

// 3. Hook for child components
export function useBooking() {
  return useContext(BookingContext);
}
