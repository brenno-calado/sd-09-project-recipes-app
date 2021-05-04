import React, { useContext, useEffect, useState } from 'react';
import { RecipeContext } from '../../Context';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function FaveMealBtn() {
  const { recipeSpec } = useContext(RecipeContext);
  const [favorited, setFavorited] = useState(false);
  const {
    idMeal,
    strMeal,
    strCategory,
    strArea,
    strMealThumb,
  } = recipeSpec;

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes && favoriteRecipes.length > 0) {
      setFavorited(favoriteRecipes.some((recipe) => recipe.id === idMeal));
    }
  }, [setFavorited, idMeal]);

  const handleFavorites = () => {
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favoriteRecipes) { favoriteRecipes = []; }
    if (!favorited) {
      const currentRecipe = {
        id: idMeal,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      };
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...favoriteRecipes, currentRecipe]));
      return setFavorited(true);
    }
    localStorage.setItem('favoriteRecipes',
      JSON.stringify(favoriteRecipes.filter((recipe) => recipe.id !== idMeal)));
    setFavorited(false);
  };

  return (
    <button type="button" onClick={ () => handleFavorites() }>
      <img
        src={ favorited ? blackHeartIcon : whiteHeartIcon }
        alt="botão de compartilhar"
        data-testid="favorite-btn"
      />
    </button>
  );
}

export default FaveMealBtn;
