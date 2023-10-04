import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../store/authContext'
import '../assets/style.css'

const FavoritesList = () => {
  const { state: { userId, token } } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    console.log(token)
    fetch(`http://localhost:4005/api/favorites/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setFavorites(data);
      })
      .catch((error) => {
        console.error('Error fetching favorites:', error);
      });
  }, [token]);

  const removeFromFavorites = (id) => {
    fetch(`http://localhost:4005/api/favorites/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
      .then((response) => response.json())
      .then(() => {
        // Remove the favorite from the local state for immediate feedback
        setFavorites((prevFavorites) => prevFavorites.filter(favorite => favorite.id !== id));
      })
      .catch((error) => {
        console.error('Error removing from favorites:', error);
      });
  };

  if (favorites.length === 0) {
    return (
      <div>
        <h2>Favorites</h2>
        <p>No favorites added yet.</p>
      </div>
    );
  }

  return (
    <div className="center-content">
      <h2>Favorites</h2>
      <div className="business-list">
        {favorites && favorites.map((favorite) => (
          <div key={favorite.id} className='business-card'>
            <div className="business-image">
              <img src={favorite.imageUrl} alt={favorite.name} />
            </div>
            <div className="business-details">
              <h2>{favorite.name}</h2>
              <p>{favorite.address}</p>
              <button onClick={() => removeFromFavorites(favorite.id)}>Remove from Favorites</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
