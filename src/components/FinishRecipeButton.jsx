import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function FinishRecipeButton({ recipe, recipeType, toggle }) {
  const [renderButton, setRenderButton] = useState(false);

  const verifyRecipeState = () => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipeType === 'comidas') {
      const { meals } = inProgress;
      const mealsValues = Object.values(meals[recipe.idMeal]);
      const result = mealsValues.every((value) => value);
      if (result) setRenderButton(true);
      if (!result) setRenderButton(false);
    }
    if (recipeType === 'bebidas') {
      const { cocktails } = inProgress;
      const cocktailsValues = Object.values(cocktails[recipe.idDrink]);
      const result = cocktailsValues.every((value) => value);
      if (result) setRenderButton(true);
      if (!result) setRenderButton(false);
    }
  };

  useEffect(() => {
    verifyRecipeState();
  }, [toggle]);

  const tags = (recipeTags) => {
    if (recipeTags === null) {
      return [];
    }
    if (recipeTags.includes(',')) {
      return recipeTags.split(',');
    }
    if (!recipeTags.includes(',')) {
      return [recipeTags];
    }
  };

  const handleClick = () => {
    const finishedMealRecipe = {
      id: recipe.idMeal,
      type: 'comida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
      doneDate: new Date().toLocaleString(),
      tags: tags(recipe.strTags),
    };
    const finishedDrinkRecipe = {
      id: recipe.idDrink,
      type: 'bebida',
      area: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
      doneDate: new Date().toLocaleString(),
      tags: tags(recipe.strTags),
      // tags: recipe.strTags === null ? [] : [...recipe.strTags.split()],
    };
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (recipeType === 'comidas') {
      const newArray = [...doneRecipes, finishedMealRecipe];
      localStorage.setItem('doneRecipes', JSON.stringify(newArray));
    }
    if (recipeType === 'bebidas') {
      const newArray = [...doneRecipes, finishedDrinkRecipe];
      localStorage.setItem('doneRecipes', JSON.stringify(newArray));
    }
  };

  const finishRecipeButton = (
    <Link to="/receitas-feitas">
      <button
        type="button"
        onClick={ handleClick }
        data-testid="finish-recipe-btn"
        disabled={ !renderButton }
      >
        Finalizar Receita
      </button>
    </Link>
  );

  return (
    <div className="finish-recipe-btn-container">
      { finishRecipeButton }
    </div>
  );
}

const mapStateToProps = (state) => ({
  recipe: state.recipeDetailsReducer.recipe,
  recipeType: state.recipesReducer.recipeType,
});

FinishRecipeButton.propTypes = {
  recipe: PropTypes.objectOf().isRequired,
  recipeType: PropTypes.string.isRequired,
  toggle: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(FinishRecipeButton);
