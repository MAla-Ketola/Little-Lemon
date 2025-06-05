// bookingForm.test.js

// 1) Mock out react-router-dom before importing BookingForm
jest.mock('react-router-dom', () => ({
  // whichever named exports your component uses:
  useNavigate: () => jest.fn(),
}));

// 2) Now import React, React Testing Library, and the component itself
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookingForm from './bookingForm';

// 3) Provide any required props (e.g. availableTimes, dispatch)
const mockDispatch = jest.fn();
const mockTimes = ["18:00", "19:00", "20:00"];

test('renders the Date label in BookingForm', () => {
  render(<BookingForm availableTimes={mockTimes} dispatch={mockDispatch} />);
  const dateLabel = screen.getByLabelText(/Date/i);
  expect(dateLabel).toBeInTheDocument();
});
