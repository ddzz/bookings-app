const LINKS_URL = `http://localhost:3001/bookings`;

// function to get all links
export async function getBookings(page = 1, filter = "") {
  const response = await fetch(`${LINKS_URL}/?page=${page}&filter=${filter}`);
  const json = await response.json();
  return json;
}

// function for POSTing to create a link
export async function createBooking(bookingData, addressData) {
  if (!bookingData) return;
  const response = await fetch(LINKS_URL, {
    method: 'POST',
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({...bookingData, address: addressData})
  });
  const json = await response.json();
  return json;
}
