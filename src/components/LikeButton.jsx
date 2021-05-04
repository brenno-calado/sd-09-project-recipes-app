import React, { useState, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { shape, string } from 'prop-types';
import { RecipesContext } from '../context';
import WhiteLikeIcon from '../images/whiteHeartIcon.svg';
import BlackLikeIcon from '../images/blackHeartIcon.svg';

export default function LikeButton({ recipeDetails }) {
  const {
    values: { favoriteRecipes },
    actions: { addRecipeToFavorites, removeRecipeFromFavorites },
  } = useContext(RecipesContext);

  const { id } = useParams();
  const { pathname } = useLocation();

  const [like, setLike] = useState(favoriteRecipes.find((recipe) => recipe.id === id));

  function likeRecipe() {
    const type = pathname.includes('comidas') ? ['comida', 'Meal'] : ['bebida', 'Drink'];
    const recipeObj = {
      id: recipeDetails[`id${type[1]}`],
      type: type[0],
      area: recipeDetails.strArea || '',
      category: recipeDetails.strCategory || '',
      alcoholicOrNot: type[1] === 'Drink' ? recipeDetails.strAlcoholic : '',
      name: recipeDetails[`str${type[1]}`],
      image: recipeDetails[`str${type[1]}Thumb`],
    };
    if (!like) {
      addRecipeToFavorites(recipeObj);
    } else {
      removeRecipeFromFavorites(recipeObj);
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
              data-testid="favorite-btn"
            />
          )
          : (
            <img
              src={ WhiteLikeIcon }
              alt="Ícone de coração vazio"
              data-testid="favorite-btn"
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
  }),
}.isRequired;
