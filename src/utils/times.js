// utils/times.js
export function initializeTimes() {
  return typeof window.fetchAPI === "function"
    ? window.fetchAPI(new Date())
    : [];
}

export function updateTimes(state, action) {
  if (action.type !== "UPDATE_TIMES") return state;

  const { date, existingBookings = [], currentBookingTime } = action;
  const allSlots =
    typeof window.fetchAPI === "function" ? window.fetchAPI(date) : [];

  const bookedSlots = existingBookings
    .filter((b) => new Date(b.date).toDateString() === date.toDateString())
    .map((b) => b.time);

  let available = allSlots.filter((slot) => !bookedSlots.includes(slot));

  if (currentBookingTime && !available.includes(currentBookingTime)) {
    available.push(currentBookingTime);
    available.sort();
  }

  return available;
}
