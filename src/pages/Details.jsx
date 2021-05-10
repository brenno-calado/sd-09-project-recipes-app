import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import Image from 'react-bootstrap/Image'
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
    <section className="recipe-details-container">
      <h1>Detalhes da Receita</h1>
      <div className="recipe-image-container">
        <Image
          src={ recipeType === 'comidas' ? recipe.strMealThumb : recipe.strDrinkThumb }
          alt="current recipe"
          data-testid="recipe-photo"
          thumbnail
          style={ { width: '400px' } }
        />
      </div>
      <div className="name-category-container">
        <h3 data-testid="recipe-title">
          { recipeType === 'comidas' ? recipe.strMeal : recipe.strDrink }
        </h3>
        <h5 data-testid="recipe-category">
          { `Category: ${recipeType === 'comidas'
            ? recipe.strCategory : recipe.strAlcoholic}` }
        </h5>
      </div>
      <div className="buttons-container">
        <ShareRecipeButton pathname={ pathname } />
        <FavoriteButton />
      </div>
      <div className="ingredient-list-container">
        <IngredientsList pathname={ pathname } />
      </div>
      <div className="instructions-container">
        <p data-testid="instructions">{ recipe.strInstructions }</p>
      </div>
      <div className="video-container">
        { recipeType === 'comidas' && (
          <ReactPlayer data-testid="video" url={ recipe.strYoutube } />
        ) }
      </div>
      <RecommendedRecipes />
      <StartRecipeButton id={ id } />
    </section>
  );
}

const mapStateToProps = (state) => ({
  recipe: state.recipeDetailsReducer.recipe,
  recipeType: state.recipesReducer.recipeType,
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
