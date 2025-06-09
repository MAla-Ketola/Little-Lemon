import { initializeTimes, updateTimes } from './Main';

describe('initializeTimes', () => {
  beforeAll(() => {
    // Mock fetchAPI to return a predictable array
    window.fetchAPI = jest.fn().mockReturnValue(['10:00', '11:00', '12:00']);
  });

  it('calls fetchAPI for today and returns its result', () => {
    const times = initializeTimes();
    // Should call fetchAPI once with a Date
    expect(window.fetchAPI).toHaveBeenCalledWith(expect.any(Date));
    expect(times).toEqual(['10:00', '11:00', '12:00']);
  });
});

describe('updateTimes', () => {
  beforeAll(() => {
    // Mock fetchAPI to return slots
    window.fetchAPI = jest.fn().mockReturnValue(['14:00', '15:00', '16:00']);
  });

  it('returns same state for unknown action types', () => {
    const prevState = ['12:00', '13:00'];
    const newState = updateTimes(prevState, { type: 'UNKNOWN_ACTION' });
    expect(newState).toBe(prevState);
  });

  it('filters out existingBookings for the given date', () => {
    const actionDate = new Date('2025-06-10');
    const existingBookings = [
      { date: '2025-06-10', time: '15:00' },
      { date: '2025-06-11', time: '16:00' }
    ];
    const action = {
      type: 'UPDATE_TIMES',
      date: actionDate,
      existingBookings,
    };

    const result = updateTimes([], action);

    // Should call fetchAPI with the provided date
    expect(window.fetchAPI).toHaveBeenCalledWith(actionDate);
    // Should remove the booked '15:00', leaving ['14:00','16:00']
    expect(result).toEqual(['14:00', '16:00']);
  });
});

