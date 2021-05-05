import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../../contexts/RecipesContext';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function FavoriteButton({ recipe, id }) {
  const { favoriteRecipes, setFavoriteRecipes } = useContext(RecipesContext);
  const [isFavorite, setFavorite] = useState(false);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    if (!storage.find((currentRecipe) => currentRecipe.id === id)) {
      setFavorite(false);
    } else {
      setFavorite(true);
    }
    setFavoriteRecipes(storage);
  }, [id, setFavoriteRecipes]);

  const favoriteRecipe = () => {
    const recipeInfo = {
      id: recipe.idMeal || recipe.idDrink,
      category: recipe.strCategory,
      area: recipe.strArea || '',
      name: recipe.strMeal || recipe.strDrink,
      alcoholicOrNot: recipe.strAlcoholic || '',
      image: recipe.strMealThumb || recipe.strDrinkThumb,
      type: recipe.strAlcoholic ? 'bebida' : 'comida',
    };

    if (isFavorite) {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify(favoriteRecipes.splice(favoriteRecipes.length - 1)));
      setFavorite(false);
    } else {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...favoriteRecipes, recipeInfo]));
      setFavorite(true);
    }
  };

  return (
    <input
      data-testid="favorite-btn"
      type="image"
      src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
      alt="Favoritar"
      onClick={ favoriteRecipe }
    />
  );
}

FavoriteButton.propTypes = {
  recipe: PropTypes.objectOf(''),
}.isRequired;

export default FavoriteButton;
