import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Bookings options, Loading screen, table columns, and buttons', async () => {
  render(<App />);
  const bookingElements = await screen.findAllByText(/Bookings/i);
  bookingElements.forEach(element => {
    expect(element).toBeInTheDocument();
  });

  const loadingElement = await screen.findByText(/Loading.../i);
  expect(loadingElement).toBeInTheDocument();

  const customerHeading = await screen.findByText(/Customer/i);
  const emailHeading = await screen.findByText(/Email/i);
  const addressHeading = await screen.findByText(/Address/i);
  const bookingTypeHeading = await screen.findByText(/Booking Type/i);
  const bookingDateHeading = await screen.findByText(/Booking Date/i);
  expect(customerHeading).toBeInTheDocument();
  expect(emailHeading).toBeInTheDocument();
  expect(addressHeading).toBeInTheDocument();
  expect(bookingTypeHeading).toBeInTheDocument();
  expect(bookingDateHeading).toBeInTheDocument();

  const previousPageButton = await screen.findByText(/Previous Page/i);
  const nextPageButton = await screen.findByText(/Next Page/i);
  const allBookingsButton = await screen.findByText(/All Bookings/i);
  const housekeepingButton = await screen.findByText(/Housekeeping only/i);
  const dogWalksbutton = await screen.findByText(/Dog walks only/i);
  const createBookingButton = await screen.findByText(/Create booking/i);
  expect(previousPageButton).toBeInTheDocument();
  expect(nextPageButton).toBeInTheDocument();
  expect(allBookingsButton).toBeInTheDocument();
  expect(housekeepingButton).toBeInTheDocument();
  expect(dogWalksbutton).toBeInTheDocument();
  expect(createBookingButton).toBeInTheDocument();
});
