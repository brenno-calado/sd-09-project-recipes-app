import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import {
  mealsByIdThunk, cocktailsByIdThunk, savePath, fetchingRecipe,
} from '../redux/actions';
import RecommendedRecipes from '../components/RecommendedRecipes';
import StartRecipeButton from '../components/StartRecipeButton';
import ShareRecipeButton from '../components/ShareRecipeButton';
import FavoriteButton from '../components/FavoriteButton';
import IngredientsList from '../components/IngredientsList';
import '../css/Details.css';

function Details({
  match: { params: { id } },
  mealsById,
  cocktailsById,
  recipeType,
  recipe,
  history,
  pathnameDispatcher,
  isFetchingRecipe,
  loading,
}) {
  const { location: { pathname } } = history;

  useEffect(() => {
    loading();
    const split = pathname.split('/');
    if (split[1] === 'comidas') {
      pathnameDispatcher(pathname, 'meals');
    }
    if (split[1] === 'bebidas') {
      pathnameDispatcher(pathname, 'cocktails');
    }
  }, []);

  useEffect(() => {
    if (recipeType === 'meals') {
      mealsById(id);
    }
    if (recipeType === 'cocktails') {
      cocktailsById(id);
    }
  }, [recipeType]);

  if (isFetchingRecipe) return <div>Loading...</div>;
  return (
    <section>
      <h1>Detalhes da Receita</h1>
      <img
        src={ recipeType === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb }
        alt="current recipe"
        data-testid="recipe-photo"
      />
      <ShareRecipeButton pathname={ pathname } />
      <FavoriteButton />
      <div>
        <p data-testid="recipe-title">
          { recipeType === 'meals' ? recipe.strMeal : recipe.strDrink }
        </p>
        <p data-testid="recipe-category">
          { recipeType === 'meals' ? recipe.strCategory : recipe.strAlcoholic }
        </p>
        {/* <p data-testid="recipe-category">{ recipe.strCategory }</p> */}
        {/* { recipeType === 'cocktails' && <p>{ recipe.strAlcoholic }</p>} */}
      </div>
      <IngredientsList />
      <div>
        <p data-testid="instructions">{ recipe.strInstructions }</p>
        <div>
          { recipeType === 'meals' && (
            <ReactPlayer data-testid="video" url={ recipe.strYoutube } />
          ) }
        </div>
      </div>
      <RecommendedRecipes />
      <StartRecipeButton id={ id } />
    </section>
  );
}

const mapStateToProps = (state) => ({
  recipe: state.recipeDetailsReducer.recipe,
  recipeType: state.recipesReducer.recipeType,
  startedMeals: state.recipeDetailsReducer.startedMeals,
  startedCocktails: state.recipeDetailsReducer.startedCocktails,
  finishedMeals: state.recipeDetailsReducer.finishedMeals,
  finishedCocktails: state.recipeDetailsReducer.finishedCocktails,
  isFetchingRecipe: state.recipeDetailsReducer.isFetchingRecipe,
});

const mapDispatchToProps = (dispatch) => ({
  mealsById: (id) => dispatch(mealsByIdThunk(id)),
  cocktailsById: (id) => dispatch(cocktailsByIdThunk(id)),
  pathnameDispatcher: (pathname, recipeType) => dispatch(savePath(pathname, recipeType)),
  loading: () => dispatch(fetchingRecipe()),
});

Details.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Details);
