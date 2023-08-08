import React, { useState } from 'react';

const TicketBookingForm = ({ showName }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    selectedShow: showName,
  });
  const [showAlert, setShowAlert] = useState(false);


  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTicketBooking = () => {
    // For demonstration purposes, we'll use session storage
    sessionStorage.setItem('ticketData', JSON.stringify(formData));
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };
  

  return (
    <div>
      <h3>Book Movie Ticket</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <button
          type="button"
          onClick={handleTicketBooking}
          className="btn btn-primary"
        >
          Book Ticket
        </button>
        {showAlert && (
  <div className="alert alert-success mt-3" role="alert">
    Ticket booked successfully!
  </div>
)}

      </form>
    </div>
  );
};

export default TicketBookingForm;
