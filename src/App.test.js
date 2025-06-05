import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Little Lemon Link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Book Now/i);
  expect(linkElement).toBeInTheDocument();
});

