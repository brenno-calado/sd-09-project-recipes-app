import React from 'react';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';

const FavoriteCard = (props) => {
  const { index, data } = props;
  const {
    id,
    type,
    category,
    alcoholicOrNot,
    image,
    name,
  } = data;
  return (
    <div>
      <p>
        {type === 'comida' ? category : alcoholicOrNot}
      </p>
      <h1 data-testid={ `${index}-horizontal-name` }>
        { name }
      </h1>
      <img
        className="recipe-image"
        src={ image }
        alt={ name }
        data-testid={ `${index}-horizontal-image` }
        width="100"
        height="100"
      />
      <ShareButton />
      <FavoriteButton />
    </div>
  );
};
export default FavoriteCard;
