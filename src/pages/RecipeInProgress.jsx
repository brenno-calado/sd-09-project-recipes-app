import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ShareRecipeButton from '../components/ShareRecipeButton';
import FavoriteButton from '../components/FavoriteButton';
import IngredientsListInProgress from '../components/IngredientsListInProgress';
import FinishRecipeButton from '../components/FinishRecipeButton';
import {
  mealsByIdThunk, cocktailsByIdThunk, savePath, fetchingRecipe,
} from '../redux/actions';
import '../css/RecipeInProgress.css';

function RecipeInProgress({
  match: { params: { id } },
  history,
  recipeType,
  recipe,
  mealsById,
  cocktailsById,
  pathnameDispatcher,
  isFetchingRecipe,
  loading,
}) {
  const { location: { pathname } } = history;

  useEffect(() => {
    loading();
    const split = pathname.split('/');
    if (split[1] === 'comidas') {
      pathnameDispatcher(pathname, 'comidas');
    }
    if (split[1] === 'bebidas') {
      pathnameDispatcher(pathname, 'bebidas');
    }
  }, []);

  useEffect(() => {
    if (recipeType === 'comidas') {
      mealsById(id);
    }
    if (recipeType === 'bebidas') {
      cocktailsById(id);
    }
  }, [recipeType]);

  if (isFetchingRecipe) return <div>Loading...</div>;
  return (
    <div>
      <img
        src={ recipeType === 'comidas' ? recipe.strMealThumb : recipe.strDrinkThumb }
        alt="current recipe"
        data-testid="recipe-photo"
      />
      <ShareRecipeButton pathname={ pathname } />
      <FavoriteButton />
      <div>
        <p data-testid="recipe-title">
          { recipeType === 'comidas' ? recipe.strMeal : recipe.strDrink }
        </p>
        <p data-testid="recipe-category">
          { recipeType === 'comidas' ? recipe.strCategory : recipe.strAlcoholic }
        </p>
      </div>
      <IngredientsListInProgress pathname={ pathname } />
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      <FinishRecipeButton />
    </div>
  );
}

const mapStateToProps = (state) => ({
  recipeType: state.recipesReducer.recipeType,
  recipe: state.recipeDetailsReducer.recipe,
  isFetchingRecipe: state.recipeDetailsReducer.isFetchingRecipe,
});

const mapDispatchToProps = (dispatch) => ({
  mealsById: (id) => dispatch(mealsByIdThunk(id)),
  cocktailsById: (id) => dispatch(cocktailsByIdThunk(id)),
  pathnameDispatcher: (pathname, recipeType) => dispatch(savePath(pathname, recipeType)),
  loading: () => dispatch(fetchingRecipe()),
});

RecipeInProgress.propTypes = {
  match: PropTypes.objectOf().isRequired,
  params: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  mealsById: PropTypes.func.isRequired,
  cocktailsById: PropTypes.func.isRequired,
  recipeType: PropTypes.string.isRequired,
  recipe: PropTypes.objectOf().isRequired,
  history: PropTypes.objectOf().isRequired,
  pathnameDispatcher: PropTypes.func.isRequired,
  isFetchingRecipe: PropTypes.bool.isRequired,
  loading: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeInProgress);
