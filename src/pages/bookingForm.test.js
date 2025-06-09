jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookingForm from './bookingForm';

// Provide all required props
const mockDispatch = jest.fn();
const mockSubmitForm = jest.fn();
const mockTimes = ['18:00', '19:00', '20:00'];
const mockBookings = [];

test('renders the Date label in BookingForm', () => {
  render(
    <BookingForm
      availableTimes={mockTimes}
      dispatch={mockDispatch}
      submitForm={mockSubmitForm}
      bookings={mockBookings}
    />
  );
  const dateLabel = screen.getByLabelText(/Date/i);
  expect(dateLabel).toBeInTheDocument();
});
