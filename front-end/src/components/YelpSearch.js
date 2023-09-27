import React, { useState, useEffect } from 'react';
import searchYelp from '../api/searchYelp';

const YelpSearch = ({ addToFavorites }) => {
  const [businesses, setBusinesses] = useState([]);
  const [term, setTerm] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (term && location) {
      searchYelp(term, location)
        .then((data) => {
          setBusinesses(data);
        })
        .catch((error) => {
          // Handle error
        });
    }
  }, [term, location]);

  return (
    <div>
      <h1>Search Yelp for Restaurants</h1>
      <input
        type="text"
        placeholder="Search term"
        onChange={(e) => setTerm(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Location (e.g., Zip Code)"
        onChange={(e) => setLocation(e.target.value)}
      />
      <ul>
        {businesses.map((business) => (
          <li key={business.id}>
            {business.name}
            <button onClick={() => addToFavorites(business)}>Add to Favorites</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YelpSearch;