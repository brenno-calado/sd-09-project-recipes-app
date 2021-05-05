import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { objectOf, bool } from 'prop-types';
import { Link } from 'react-router-dom';
import { getMealById, mapIngredientToMeasure } from '../actions/MealById';
import ShareAndFavo from '../components/ShareAndFavo';
import '../Style/Details.css';

function FoodDetails({ recipes, match, history, getMealByIdDispatch, recommendedFoods }) {
  const [recipe, setRecipe] = useState(null);
  const [ingredientToMeasure, setIngredientToMeasure] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(true);
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (local) {
      const inProgressRecipe = Object.keys(local.meals)
        .some((id) => id === match.params.id);
      setInProgress(inProgressRecipe);
    }
  }, [match]);

  useEffect(() => {
    const completedRecipe = () => {
      const local = JSON.parse(localStorage.getItem('doneRecipes')) || [];
      const isCompleted = local.some(({ id }) => id === match.params.id);
      setCompleted(isCompleted);
    };

    completedRecipe();
  }, [match]);

  useEffect(() => {
    const recipeID = match.params.id;
    if (!recipe) {
      getMealByIdDispatch(recipeID);
    }
    const selectedRecipe = recipes;
    setRecipe(selectedRecipe);
    setLoading(false);
    if (selectedRecipe) {
      setIngredientToMeasure(mapIngredientToMeasure(selectedRecipe));
    }
    if (!selectedRecipe) {
      history.push({
        pathname: '/comidas',
      });
    }
  }, [match, recipe, recipes, history, getMealByIdDispatch]);

  const MAX_SLICE_YOUTUBE = 11;
  const MAX_SLICE = 6;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img
        src={ `${recipe.strMealThumb}` }
        alt="recipe"
        data-testid="recipe-photo"
        className="detailsImage"
      />
      <div className="headerDetails">
        <div className="detailsMainInfos">
          <h2
            data-testid="recipe-title"
            className="detailsTitle"
          >
            {recipe.strMeal}
          </h2>
          <h2
            data-testid="recipe-category"
            className="detailsCategory"
          >
            {recipe.strCategory}
          </h2>
        </div>
        <div>
          <ShareAndFavo match={ match } recipe={ recipe } />
        </div>
      </div>
      <h3 className="detailsSubtitle">Ingredientes</h3>
      <div>
        <ul className="ingredientsList">
          {ingredientToMeasure
            .map((item) => item.ingredient && (
              <li
                data-testid={ `${item.index}-ingredient-name-and-measure` }
                key={ item.index }
              >
                {`${item.ingredient} - ${item.measure}`}
              </li>
            ))}
        </ul>
      </div>
      <h3 className="detailsSubtitle">Instructions</h3>
      <div className="instructions">
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </div>
      <h3 className="detailsSubtitle">Video</h3>
      { recipe.strYoutube && (<iframe
        width="560"
        height="315"
        data-testid="video"
        src={ `https://www.youtube.com/embed/${recipe.strYoutube
          .slice(recipe
            .strYoutube.length - MAX_SLICE_YOUTUBE, recipe.strYoutube.length)}` }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay;
          clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />)}
      <h3 className="detailsSubtitle">Recomendadas</h3>
      <div
        className="gallery"
        data-flickity-options='{ "wrapAround": true }'
      >
        {recommendedFoods && recommendedFoods.slice(0, MAX_SLICE).map((item) => (
          <div
            className="gallery-cell"
            key={ `${item.index}` }
            data-testid={ `${item.index}-recomendation-card` }
          >
            <a href={ `/bebidas/${item.idDrink}` }>
              <img className="image-recipe" src={ `${item.strDrinkThumb}` } alt="" />
            </a>
            <p>{ item.strCategory }</p>
            <h2
              data-testid={ `${item.index}-recomendation-title` }
            >
              {item.strDrink}
            </h2>

          </div>
        ))}
      </div>
      { !completed && (
        <Link to={ `/comidas/${match.params.id}/in-progress` }>
          <button
            className="init-btn"
            type="button"
            data-testid="start-recipe-btn"
          >
            { inProgress ? 'Continuar Receita' : 'Iniciar Receita' }
          </button>
        </Link>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  recipes: state.setDetails.data,
  recommendedFoods: state.setDetails.recommendedFoods,
  loading: state.setDetails.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getMealByIdDispatch: (ID) => dispatch(getMealById(ID)),
});

FoodDetails.propTypes = {
  recipes: objectOf(),
  loading: bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(FoodDetails);
