import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Image from 'react-bootstrap/Image'
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
  const [toggle, setToggle] = useState(false);
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
    <div className="recipe-inprogress-container">
      <div>
        <h1 data-testid="recipe-title">
          { recipeType === 'comidas' ? recipe.strMeal : recipe.strDrink }
        </h1>
        <div className="name-category-container">
          <h5 data-testid="recipe-category">
            { `Category: ${recipeType === 'comidas'
              ? recipe.strCategory : recipe.strAlcoholic}` }
          </h5>
        </div>
      </div>
      <div className="image-inprogress-container">
        <Image
          src={ recipeType === 'comidas' ? recipe.strMealThumb : recipe.strDrinkThumb }
          alt="current recipe"
          data-testid="recipe-photo"
          thumbnail
          style={ { width: '400px' } }
        />
      </div>
      <div className="buttons-container">
        <ShareRecipeButton pathname={ pathname } />
        <FavoriteButton />
      </div>
      <div className="inprogress-list-container">
        <IngredientsListInProgress pathname={ pathname } setToggle={ setToggle } />
      </div>
      <div className="inprogress-instructions-container">
        <p data-testid="instructions">{ recipe.strInstructions }</p>
      </div>
      <FinishRecipeButton toggle={ toggle } />
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
