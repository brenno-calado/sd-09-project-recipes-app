import React, { useState, useContext } from 'react';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';
import { saveAsFavorite } from '../services/details';
import { MyContext } from '../MyContext';

const FavoriteCard = (props) => {
  const { index, element } = props;
  const { data } = useContext(MyContext);
  const {
    id,
    type,
    category,
    alcoholicOrNot,
    image,
    name,
  } = element;
  const [isFavorite, setIsFavorite] = useState(true);
  const saveFavorite = () => {
    setIsFavorite(!isFavorite);
    saveAsFavorite(id, data, type);
  };
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
      <FavoriteButton onClick={ saveFavorite } isFavorite={ isFavorite } />
    </div>
  );
};
export default FavoriteCard;
