import React from 'react';
import ShareButton from './ShareButton';

export default function FavoriteCard() {
  return (
    <div>
      <img
        className="recipe-image"
        src={ data[`str${foodOrDrink}Thumb`] }
        alt={ data[`str${foodOrDrink}`] }
        data-testid="recipe-photo"
        width="100"
        height="100"
      />
      <ShareButton />
    </div>
  );
}
