import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton({ recipe, recipeType }) {
  const saveFavoriteRecipe = () => {
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isInArray = favorites
      .some((elem) => elem.id === recipe.idMeal || elem.id === recipe.idDrink);
    if (isInArray) {
      const index = favorites
        .findIndex((item) => item.id === recipe.idMeal || item.id === recipe.idDrink);
      favorites.splice(index, 1);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
    } else {
      const object = {
        id: (recipeType === 'meals' ? recipe.idMeal : recipe.idDrink),
        type: recipeType,
        area: (recipeType === 'meals' ? recipe.strArea : ''),
        category: recipe.strCategory,
        alcoholicOrNot: (recipeType === 'meals' ? '' : recipe.strAlcoholic),
        name: (recipeType === 'meals' ? recipe.strMeal : recipe.strDrink),
        image: (recipeType === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb),
      };
      const newArray = [...favorites, object];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
    }
  };

  const renderImg = () => {
    const white = (
      <img
        src={ whiteHeartIcon }
        alt="favorite button"
      />
    );
    const black = (
      <img
        src={ blackHeartIcon }
        alt="favorite button"
      />
    );
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isInArray = favorites
      .some((item) => item.id === recipe.idMeal || item.id === recipe.idDrink);
    if (isInArray) {
      return black;
    }
    return white;
  };

  console.log('renderizei');
  return (
    <div>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ saveFavoriteRecipe }
      >
        { renderImg() }
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  recipe: state.recipeDetailsReducer.recipe,
  recipeType: state.recipesReducer.recipeType,
});

FavoriteButton.propTypes = {
  recipe: PropTypes.objectOf().isRequired,
  recipeType: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(FavoriteButton);
