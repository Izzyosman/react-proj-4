import React from 'react';
import SaveButton from './SaveButton'; // Import the SaveButton component

const FavoritesList = ({ favorites, removeFromFavorites, addToFavorites }) => {
  return (
    <div>
      <h2>Favorites</h2>
      <ul>
        {favorites.map((restaurant) => (
          <li key={restaurant.id}>
            {restaurant.name}
            <button onClick={() => removeFromFavorites(restaurant)}>Remove</button>
            {/* Include the SaveButton component */}
            <SaveButton onClick={() => addToFavorites(restaurant)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesList;
