import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import {
//   verifyIfRecipeWasStarted, verifyIfRecipeWasFinished,
// } from '../helpers/VerifyRecipeStatus';

function FinishRecipeButton({ recipe, recipeType, isAssembled }) {
  // const [recipeState, setRecipeState] = useState();

  const verifyRecipeState = () => {
    // const currentRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    // if (recipeType === 'comidas') {
    //   const { meals } = currentRecipe;
    //   const currentRecipeEntries = Object.entries(meals[recipe.idMeal]);
    //   const allIsTrue = currentRecipeEntries.every((entry) => entry[1]);
    //   console.log(allIsTrue);
    // }
    // if (recipeType === 'bebidas') {
    //   const { cocktails } = currentRecipe;
    //   const currentRecipeEntries = Object.entries(cocktails[recipe.idMeal]);
    //   const allIsTrue = currentRecipeEntries.every((entry) => entry[1]);
    //   console.log(allIsTrue);
    // }
  };

  useEffect(() => {
    if (!localStorage.getItem('doneRecipes')) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    if (!localStorage.getItem('inProgressRecipes')) {
      if (recipeType === 'comidas') {
        const object = {
          cocktails: {},
          meals: {
            [recipe.idMeal]: {},
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(object));
      }
      if (recipeType === 'bebidas') {
        const object = {
          cocktails: {
            [recipe.idDrink]: {},
          },
          meals: {},
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(object));
      }
    }
    verifyRecipeState();
  }, [recipe]);

  useEffect(() => {
    if (isAssembled) {
      verifyRecipeState();
    }
  }, [isAssembled]);

  // console.log(isAssembled);

  const finishRecipeButton = (
    // <Link to={ `/${recipeType}/${id}/in-progress` }>
    <button
      type="button"
      onClick={ () => {} }
      data-testid="finish-recipe-btn"
    >
      Finalizar Receita
    </button>
    // </Link>
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
  isAssembled: state.recipeDetailsReducer.isAssembled,
});

FinishRecipeButton.propTypes = {
  recipe: PropTypes.objectOf().isRequired,
  recipeType: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(FinishRecipeButton);
