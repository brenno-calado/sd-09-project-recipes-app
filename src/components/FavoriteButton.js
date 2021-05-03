import React from 'react';

import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const FavoriteButton = () => (
  <div>
    <img
      data-testid="favorite-btn"
      src={ whiteHeartIcon }
      alt="Favoritar"
    />
  </div>
);

export default FavoriteButton;
