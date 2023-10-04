import React from 'react';
import {useState, useEffect, useContext} from 'react'
import AuthContext from '../store/authContext'
import searchYelp from '../api/searchYelp'
import '../assets/style.css'

const Home = () => {
  const { state: { userId, token } } = useContext(AuthContext);
  const [businesses, setBusinesses] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [location, setLocation] = useState('');

  const addToFavorites = (business) => {
    if(!token) {
      alert('You need to login!')
      return;
    }
    console.log(business);
    const favoriteData = {
      businessId: business.id,
      imageUrl: business.image_url,
      name: business.name,
      address: business.location.address1,
    };   

    console.log(favoriteData);

    fetch(`http://localhost:4005/api/favorites/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({ favoriteData, userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Successfully added to favorites!');
        console.log('Added to favorites:', data);

      })
      .catch((error) => {
        console.error('Error adding to favorites:', error);

      });
  };


  const handleLocationSubmit = () => {
    if (location) {
      searchYelp(location)
        .then((data) => {
            console.log(data);
            setHasSearched(true);
            setBusinesses(data); // Update state with Yelp businesses
        })
        .catch((error) => {
          // Handle error
        });
    }
  };

  const businessCards = businesses && businesses.map((business) => (
    <div key={business.id} className='business-card'>
      <div className="business-image">
        <img src={business.image_url} alt={business.name} />
      </div>
      <div className="business-details">
        <h2>{business.name}</h2>
        <p>{business.location.address1}</p>
        <button 
          className="add-to-favorites-button" 
          onClick={() => addToFavorites(business)}>Add to Favorites</button>
      </div>
    </div>
  ));
      
  return (
    <main>
      <div>
          <h1>Enter Zip Code to Search Restaurants</h1>
          <br />
          <input
          type="text"
          placeholder="Enter a zipcode..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          />
          <button onClick={handleLocationSubmit}>Submit</button>
      </div>
      {hasSearched && (
          <div className="business-list">
          {businessCards &&businessCards.length >= 1 ? (
              businessCards
          ) : (
              <p>No results found</p>
          )}
          </div>
      )}
    </main>
  );

}

export default Home
