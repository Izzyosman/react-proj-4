import {useState, useEffect, useContext} from 'react'
import AuthContext from '../store/authContext'
import searchYelp from '../api/searchYelp'
import '../assets/style.css'

const Home = () => {
    const { state: { userId, token } } = useContext(AuthContext);
    const [businesses, setBusinesses] = useState([]); // State to store Yelp businesses
    const [hasSearched, setHasSearched] = useState(false);
    const [location, setLocation] = useState('');

    const addToFavorites = (business) => {
      const favoriteData = {
        businessId: business.id,
        imageUrl: business.image_url,
        name: business.name,
        address: business.location.address1,
      };
  
      fetch('http://localhost:4005/api/add-to-favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ favoriteData, userId }), // Include the business data and user ID
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Added to favorites:', data);
          // Optionally, you can update the UI to reflect that the restaurant has been added to favorites
        })
        .catch((error) => {
          console.error('Error adding to favorites:', error);
          // Handle error
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

    const businessCards = businesses?.map((business) => (
        <div key={business.id} className='business-card'>
          <div className="business-image">
            <img src={business.image_url} alt={business.name} />
          </div>
          <div className="business-details">
            <h2>{business.name}</h2>
            <p>{business.location.address1}</p>
            <button className="add-to-favorites-button">Add to Favorites</button>
          </div>
        </div>
    ));
      

    // ... (Previous code)

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
            {businessCards?.length >= 1 ? (
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