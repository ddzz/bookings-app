import React from 'react';
import Modal from 'react-modal';
import logo from './logo.svg';
import './App.css';
import { getBookings, createBooking } from './api';

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ffffff'
  }
};

function App() {
  const [bookings, setBookings] = React.useState([]);
  const [booking, setBooking] = React.useState({ booking_type: "Housekeeping" });
  const [address, setAddress] = React.useState({ street: "" });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [filter, setFilter] = React.useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    // fetch all bookings
    async function fetchData() {
      setLoading(true);
      setBookings(await getBookings(page));
      setLoading(false);
    }
    fetchData();
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking({...booking, [name]: value});
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress({...address, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    closeModal();
    setLoading(true);
    const newBooking = await createBooking(booking, address);
    setBookings(await getBookings());
    setBooking({ booking_type: "Housekeeping" });
    setAddress({ street: "" });
    setLoading(false);
    if (newBooking.error) {
      setError(true);
      setTimeout(() => { setError(false); }, 3000);
    }
  };

  const handleClick = async (e, increment = true) => {
    e.preventDefault();
    setLoading(true);
    if (increment) {
      setBookings(await getBookings(page + 1, filter));
      setPage(page + 1);
    } else {
      setBookings(await getBookings(page - 1, filter));
      setPage(page - 1);
    }
    setLoading(false);
  };

  const handleToggle = async(e, filter = "") => {
    setLoading(true);
    setFilter(filter);
    setPage(1);
    setBookings(await getBookings(page, filter));
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="body">
        <h2>Bookings</h2>
        <button className="create-booking" onClick={openModal}>Create booking</button><br />
        <Modal style={customStyles} isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Create Booking Modal">
            <h2>Create Booking</h2>
            <form onSubmit={handleSubmit}>
            <table>
              <tbody>
                <tr className="no-border">
                  <td className="left-align"><label>Name</label><input type="text" name="name" value={booking.name} onChange={handleChange} /></td>
                  <td className="left-align"><label>Booking Type</label>
                      <select name="booking_type" value={booking.booking_type} onChange={handleChange}>
                        <option value="Housekeeping">Housekeeping</option>
                        <option value="Dog walk">Dog walk</option>
                      </select>
                    </td>
              </tr>
              <tr className="no-border">
                <td className="left-align"><label>Email</label><input type="text" name="email" value={booking.email} onChange={handleChange} /></td>
                <td className="left-align"><label>Booking Date (YYYY/MM/DD)</label><input type="text" name="booking_date" value={booking.booking_date} onChange={handleChange} /></td>
              </tr>
              <tr className="no-border">
                <td className="left-align"><label>Street Address</label><input type="text" name="street" value={address.street} onChange={handleAddressChange} /></td>
                <td className="left-align"><label>Booking Time (HH:MM AM/PM)</label><input type="text" name="booking_time" value={booking.booking_time} onChange={handleChange} /></td>

              </tr>
              <tr className="no-border">
                <td className="left-align"><label>City</label><input type="text" name="city" value={address.city} onChange={handleAddressChange} /></td>
              </tr>
              <tr className="no-border">
                <td className="left-align"><label>State</label><input type="text" name="state" value={address.state} onChange={handleAddressChange} />
                <label>ZIP Code</label><input type="text" name="zip_code" value={address.zip_code} onChange={handleAddressChange} /></td>
              </tr>
            </tbody>
          </table>
              <button onClick={closeModal}>Cancel</button>
              <button type="submit">Create booking</button><br /><br />
            </form>
        </Modal>
        {loading && (
          <p className="loading">Loading...</p>
        )}
        {error && (
          <p className="error">Booking not created. Please try again.</p>
        )}
        <p className="App-link">
          <button onClick={(e) => { handleClick(e, false) }} disabled={page === 1}>Previous Page</button>
          <button onClick={handleClick} disabled={bookings.length < 20}>Next Page</button>
        </p>
        <p className="App-link">
          <button onClick={handleToggle} disabled={filter === ""}>All Bookings</button>
          <button onClick={(e) => { handleToggle(e, "Housekeeping") }} disabled={filter === "Housekeeping"}>Housekeeping only</button>
          <button onClick={(e) => { handleToggle(e, "Dog walk") }} disabled={filter === "Dog walk"}>Dog walks only</button>
        </p>
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Address</th>
              <th>Booking Type</th>
              <th>Booking Date/Time</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id}>
                <td>{booking.name}</td>
                <td>{booking.email}</td>
                <td>
                  {booking.address.street}<br />
                  {`${booking.address.city}, ${booking.address.state} ${booking.address.zip_code}`}
                </td>
                <td>{booking.booking_type}</td>
                <td>{`${booking.booking_date} at ${booking.booking_time}`}</td>
              </tr>
            ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default App;
