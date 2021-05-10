import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton({ recipe, recipeType }) {
  const [isFavorite, setIsFavorite] = useState();

  const getObject = () => {
    if (recipeType === 'comidas') {
      const object = {
        id: recipe.idMeal,
        type: 'comida',
        area: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      };
      return object;
    }
    const object = {
      id: recipe.idDrink,
      type: 'bebida',
      area: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };
    return object;
  };

  const saveFavoriteRecipe = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isInArray = favorites
      .some((elem) => elem.id === recipe.idMeal || elem.id === recipe.idDrink);
    if (isInArray) {
      const index = favorites
        .findIndex((item) => item.id === recipe.idMeal || item.id === recipe.idDrink);
      favorites.splice(index, 1);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
      setIsFavorite(!isFavorite);
    } else {
      const object = getObject();
      const newArray = [...favorites, object];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
      setIsFavorite(!isFavorite);
    }
  };

  const renderImg = () => {
    const blackButton = (
      <Button
        size="lg"
        variant="outline-dark"
        style={ { height: '50px', width: '80px' } }
        type="button"
        data-testid="favorite-btn"
        onClick={ saveFavoriteRecipe }
        src={ blackHeartIcon }
      >
        <img
          src={ blackHeartIcon }
          alt="favorite button"
        />
      </Button>
    );
    const whiteButton = (
      <Button
        size="lg"
        variant="outline-dark"
        style={ { height: '50px', width: '80px' } }
        type="button"
        data-testid="favorite-btn"
        onClick={ saveFavoriteRecipe }
        src={ whiteHeartIcon }
      >
        <img
          src={ whiteHeartIcon }
          alt="favorite button"
        />
      </Button>
    );

    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favorites) return <p>Loading...</p>;
    const isInArray = favorites
      .some((elem) => elem.id === recipe.idMeal || elem.id === recipe.idDrink);
    if (isInArray) {
      return blackButton;
    }
    return whiteButton;
  };

  useEffect(() => {
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  }, []);

  return (
    <div>
      { renderImg() }
    </div>
  );
}

const mapStateToProps = (state) => ({
  recipe: state.recipeDetailsReducer.recipe,
  recipeType: state.recipesReducer.recipeType,
  isFavorite: state.recipeDetailsReducer.isFavorite,
});

FavoriteButton.propTypes = {
  recipe: PropTypes.objectOf().isRequired,
  recipeType: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(FavoriteButton);
