import React from 'react';

const FavoritesList = ({ favorites, removeFromFavorites }) => {
  return (
    <div>
      <h2>Favorites</h2>
      <ul>
        {favorites.map((restaurant) => (
          <li key={restaurant.id}>
            {restaurant.name}
            <button onClick={() => removeFromFavorites(restaurant)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesList;
