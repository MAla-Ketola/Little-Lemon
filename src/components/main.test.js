// main.test.js
import { initializeTimes, updateTimes } from './Main';

describe('initializeTimes', () => {
  test('returns the initial array of time slots', () => {
    const times = initializeTimes();
    expect(Array.isArray(times)).toBe(true);
    expect(times).toEqual(["18:00", "19:00", "20:00", "21:00", "22:00"]);
  });
});

describe('updateTimes', () => {
  test('returns same state for unknown action types', () => {
    const prevState = ["12:00", "13:00"];
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = updateTimes(prevState, action);
    expect(newState).toBe(prevState); // should not mutate or replace
  });

  test('on UPDATE_TIMES action, returns initializeTimes output', () => {
    const prevState = ["12:00", "13:00"];
    const action = { type: 'UPDATE_TIMES', date: '2025-06-10' };
    const newState = updateTimes(prevState, action);

    // initializeTimes() is hard-coded to return ["18:00", "19:00", "20:00", "21:00", "22:00"]
    expect(newState).toEqual(initializeTimes());
    expect(newState).not.toBe(prevState); // confirm it’s a new array reference
  });
});
