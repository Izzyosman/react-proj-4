import React, { useState, useEffect } from 'react';
import searchYelp from '../api/searchYelp';

function YelpSearch() {
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
      <h1>Enter Zip Code to Search Restaurants</h1>
      <br/>
      {/* <input
        type="text"
        placeholder="Search term"
        onChange={(e) => setTerm(e.target.value)}
      /> */}
      <input
        type="text"
        placeholder="Enter Zip Code"
        onChange={(e) => setLocation(e.target.value)}
      />
      {/* Display the fetched businesses here */}
    </div>
  );
}

export default YelpSearch;