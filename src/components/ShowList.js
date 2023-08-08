import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then(response => response.json())
      .then(data => setShows(data));
  }, []);

  return (
    <div className="container">
      <h1 className="mt-5 text-center">TV Shows</h1>
      <div className="row mt-3">
        {shows.map(show => (
          <div key={show.show.id} className="col-md-4 mb-4">
            <div className="card">
              {show.show.image && (
                <img
                  src={show.show.image.medium}
                  alt={show.show.name}
                  className="card-img-top mx-auto mt-2"
                  style={{ width: '255px' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{show.show.name}</h5>
                <p className="card-text mb-0">Language: {show.show.language}</p>
                <p className="card-text mb-0">
                  Genre: {show.show.genres.join(', ')}
                </p>
                <p className="card-text mb-1">Rating: {show.show.rating?.average || 'N/A'}</p> 
                <Link to={`/show/${show.show.id}`} className="btn btn-primary">
                  Get tickets
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowList;
