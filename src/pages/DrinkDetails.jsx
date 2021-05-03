import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { objectOf, bool } from 'prop-types';
import { Link } from 'react-router-dom';
import { getDrinkById } from '../actions/getDrinkById';
import { mapIngredientToMeasure } from '../actions/MealById';
import ShareAndFavo from '../components/ShareAndFavo';
import '../Style/Details.css';

function DrinkDetails({
  recipes, match, history, getDrinkByIdDispatch, recommendedFoods }) {
  const [recipe, setRecipe] = useState(null);
  const [ingredientToMeasure, setIngredientToMeasure] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(true);
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (local) {
      const inProgressRecipe = Object.keys(local.cocktails)
        .some((id) => id === match.params.id);
      setInProgress(inProgressRecipe);
    }
  }, [match]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const isCompleted = local.some(({ id }) => id === match.params.id);
    setCompleted(isCompleted);
  }, [match]);

  useEffect(() => {
    const recipeID = match.params.id;
    if (!recipe) {
      getDrinkByIdDispatch(recipeID);
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
  }, [match, recipe, recipes, history, getDrinkByIdDispatch]);

  const MAX_SLICE = 6;
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="detailsPage">
      <img
        src={ `${recipe.strDrinkThumb}` }
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
            {recipe.strDrink}
          </h2>
          <h2
            data-testid="recipe-category"
            className="detailsCategory"
          >
            {recipe.strAlcoholic || recipe.strCategory}
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
              <li>{`- ${item.ingredient} - ${item.measure}`}</li>
            ))}
        </ul>
      </div>
      <h3 className="detailsSubtitle">Instructions</h3>
      <div className="instructions">
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </div>
      <h3 className="detailsSubtitle">Recomendadas</h3>
      <div
        className="gallery"
        data-flickity-options='{ "wrapAround": true }'
      >
        {recommendedFoods && recommendedFoods.slice(0, MAX_SLICE).map((item) => (
          <div
            className="gallery-cell recommended"
            key={ `${item.index}` }
            data-testid={ `${item.index}-recomendation-card` }
          >
            <Link to={ `/comidas/${item.idMeal}` }>
              <img className="image-recipe" src={ `${item.strMealThumb}` } alt="" />
            </Link>
            <p>{ item.strCategory }</p>
            <h2
              data-testid={ `${item.index}-recomendation-title` }
            >
              {item.strMeal}
            </h2>
          </div>
        ))}
      </div>
      { !completed && (
        <Link to={ `/bebidas/${match.params.id}/in-progress` }>
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
  recipes: state.setData.data,
  recommendedFoods: state.setData.recommendedFoods,
  loading: state.setData.loading,
});
const mapDispatchToProps = (dispatch) => ({
  getDrinkByIdDispatch: (ID) => dispatch(getDrinkById(ID)),
});
DrinkDetails.propTypes = {
  recipes: objectOf(),
  loading: bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(DrinkDetails);
