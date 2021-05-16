import React, { useContext } from 'react';
import { string, shape, number } from 'prop-types';
import { Context } from '../context';
import { addToFavorite, removeToFavorite } from '../services/functionsApi';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton({ data, id, query }) {
  const { favoriteRecipe, setFavoriteRecipe } = useContext(Context);

  const favorite = () => {
    if (!favoriteRecipe) {
      addToFavorite(query, data);
    } else {
      removeToFavorite(id);
    }
    setFavoriteRecipe(!favoriteRecipe);
  };

  return (
    <button
      data-testid="favorite-btn"
      type="button"
      onClick={ favorite }
      src={ !favoriteRecipe ? whiteHeartIcon : blackHeartIcon }
    >
      <img
        src={ !favoriteRecipe ? whiteHeartIcon : blackHeartIcon }
        alt="favorite icon"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  data: shape({
    id: string,
    type: string,
    area: string,
    category: string,
    alcoholicOrNot: string,
    name: string,
    image: string,
  }),
  id: number,
  query: string,
}.isRequired;

export default FavoriteButton;
