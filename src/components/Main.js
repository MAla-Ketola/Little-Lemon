import React, { useReducer } from 'react';

// 1) Returns the initial list of times when the app first renders
export function initializeTimes() {
  return ["18:00", "19:00", "20:00", "21:00", "22:00"];
}

// 2) Reducer to handle updating the list of times based on a dispatched action
export function updateTimes(state, action) {
  switch (action.type) {
    case 'UPDATE_TIMES':
      // In a real app, you would fetch availability from an API using action.date.
      // For now, always return the same initial times:
      return initializeTimes();
    default:
      return state;
  }
}

export default function Main({ children }) {
  // 3) Initialize useReducer with the reducer and initial state
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    [],
    initializeTimes
  );

  return (
    <main>
      {/* Clone each child and pass availableTimes & dispatch via props */}
      {React.Children.map(children, child =>
      React.cloneElement(child, { availableTimes, dispatch })
    )}
    </main>
  );
}