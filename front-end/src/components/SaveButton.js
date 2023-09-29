import React from 'react';

function SaveButton({ onClick }) {
  return (
    <button onClick={onClick}>Add to Favorites</button>
  );
}

export default SaveButton;