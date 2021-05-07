import React, { useState, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { shape, string, number } from 'prop-types';
import { RecipesContext } from '../context';
import WhiteLikeIcon from '../images/whiteHeartIcon.svg';
import BlackLikeIcon from '../images/blackHeartIcon.svg';

export default function LikeButton({ recipeDetails, index }) {
  const {
    values: { favoriteRecipes: faviRecContext },
    actions: { addRecipeToFavorites, removeRecipeFromFavorites },
  } = useContext(RecipesContext);

  const { id: idURL } = useParams();
  const { pathname } = useLocation();

  const [favoriteRecipes] = useState(faviRecContext || []);
  const [like, setLike] = useState(favoriteRecipes.find((recipe) => recipe.id === idURL));

  function likeRecipe() {
    const { id, type, area, category, alcoholicOrNot, name, image } = recipeDetails;
    if (!like) {
      addRecipeToFavorites({ id, type, area, category, alcoholicOrNot, name, image });
    } else {
      removeRecipeFromFavorites(
        { id, type, area, category, alcoholicOrNot, name, image },
      );
    }
    setLike(!like);
  }

  return (
    <>
      <button
        type="button"
        onClick={ likeRecipe }
      >
        {like
          ? (
            <img
              src={ BlackLikeIcon }
              alt="Ícone de coração preenchido"
              data-testid={
                pathname.includes('receitas-feitas')
                || pathname.includes('receitas-favoritas')
                  ? `${index}-horizontal-favorite-btn`
                  : 'favorite-btn'
              }
            />
          )
          : (
            <img
              src={ WhiteLikeIcon }
              alt="Ícone de coração vazio"
              data-testid={
                pathname.includes('receitas-feitas')
                || pathname.includes('receitas-favoritas')
                  ? `${index}-horizontal-favorite-btn`
                  : 'favorite-btn'
              }
            />
          )}
      </button>
      <br />
    </>
  );
}

LikeButton.propTypes = {
  recipeDetails: shape({
    strArea: string,
    strCategory: string,
    strAlcoholic: string,
  }).isRequired,
  index: number,
};

LikeButton.defaultProps = {
  index: 0,
};
