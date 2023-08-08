import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TicketBookingForm from './TicketBookingForm';
import { Link } from 'react-router-dom';

const ShowDetails = () => {
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then(response => response.json())
      .then(data => setShowDetails(data));
  }, [id]);

  if (!showDetails) {
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-2">
      <div className="d-flex">
        <Link to={`/`} className="btn btn-success my-auto">
          Back to shows
        </Link>
        <h1 className="mx-auto">Show Details</h1>
     </div>
      <hr style={{ margin: '20px 0', border: '1px solid #ccc' }} />
      <h2>{showDetails.name}</h2>
      <div className="mb-3 text-center"> 
  {showDetails.image && (
    <img
      src={showDetails.image.medium}
      alt={showDetails.name}
      className="img-fluid mx-auto" 
      style={{ display: 'block' }} 
    />
  )}
</div>
<div>
  <h3>Summary</h3>
  <p>{showDetails.summary.replace(/<[^>]*>/g, '')}</p>
  <div>
  <h3 className="duration-label">Duration: <span className="duration-value">{showDetails.runtime} minutes.</span></h3>
</div>

  
</div>

      <button
        className="btn btn-primary "
        onClick={() => setShowBookingForm(true)}
      >
        Book Movie Ticket
      </button>
      {showBookingForm && <TicketBookingForm showName={showDetails.name} />}

      {showDetails.officialSite && (
        <div className="mt-5 mb-5">
          <h3>Official Site</h3>
          <iframe
            src={showDetails.officialSite}
            title="Official Site"
            width="100%"
            height="500"
           allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default ShowDetails;
