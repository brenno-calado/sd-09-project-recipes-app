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

  const finishRecipeButton = (
    <Link to="/receitas-feitas">
      <button
        type="button"
        onClick={ () => {} }
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
