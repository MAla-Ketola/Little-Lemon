// bookingForm.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import BookingForm from './bookingForm';

// mocks for required props
const mockDispatch    = jest.fn();
const mockSubmitForm  = jest.fn(() => true);
const mockTimes       = ['18:00', '19:00', '20:00'];
const mockBookings    = [];

beforeEach(() => {
  jest.clearAllMocks();
});

describe('HTML5 validation attributes', () => {
  beforeEach(() => {
    render(
      <BookingForm
        availableTimes={mockTimes}
        dispatch={mockDispatch}
        submitForm={mockSubmitForm}
        bookings={mockBookings}
      />
    );
  });

  test('date input is type="date", required and has today as min', () => {
    const dateInput = screen.getByLabelText(/Date/i);
    expect(dateInput).toHaveAttribute('type', 'date');                         // :contentReference[oaicite:0]{index=0}
    expect(dateInput).toBeRequired();                                          // :contentReference[oaicite:1]{index=1}
    const today = new Date().toISOString().split('T')[0];
    expect(dateInput).toHaveAttribute('min', today);                          // :contentReference[oaicite:2]{index=2}
  });

  test('time select is required', () => {
    const timeSelect = screen.getByLabelText(/Time/i);
    expect(timeSelect).toBeRequired();                                         // :contentReference[oaicite:3]{index=3}
  });

  test('guests select is required', () => {
    const guestsSelect = screen.getByLabelText(/Number of Guests/i);
    expect(guestsSelect).toBeRequired();                                       // :contentReference[oaicite:4]{index=4}
  });

  test('occasion select is required', () => {
    const occSelect = screen.getByLabelText(/Occasion/i);
    expect(occSelect).toBeRequired();                                          // :contentReference[oaicite:5]{index=5}
  });
});

describe('Form submission logic', () => {
  test('does not call submitForm when required fields are missing', async () => {
    const user = userEvent;
    render(
      <BookingForm
        availableTimes={mockTimes}
        dispatch={mockDispatch}
        submitForm={mockSubmitForm}
        bookings={mockBookings}
      />
    );

    // by default time, guests, occasion are empty → form invalid
    await user.click(screen.getByRole('button', { name: /Let’s go!/i }));
    expect(mockSubmitForm).not.toHaveBeenCalled();                              // :contentReference[oaicite:6]{index=6}
  });

  test('calls submitForm with correct data when all fields are valid', async () => {
    const user = userEvent;
    render(
      <BookingForm
        availableTimes={mockTimes}
        dispatch={mockDispatch}
        submitForm={mockSubmitForm}
        bookings={mockBookings}
      />
    );

    // pick a time slot
    await user.selectOptions(screen.getByLabelText(/Time/i), mockTimes[1]);
    // pick 2 guests
    await user.selectOptions(screen.getByLabelText(/Number of Guests/i), '2');
    // pick occasion
    await user.selectOptions(screen.getByLabelText(/Occasion/i), 'Birthday');

    // now formRef.checkValidity() will be true, so submission proceeds
    await user.click(screen.getByRole('button', { name: /Let’s go!/i }));

    expect(mockSubmitForm).toHaveBeenCalledWith(expect.objectContaining({
      date: expect.any(String),
      time: mockTimes[1],
      guests: '2',
      occasion: 'Birthday',
      seating: 'inside',    // default
      comments: ''          // default
    }));                                                                         // :contentReference[oaicite:7]{index=7}
  });
});
