import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { objectOf, bool } from 'prop-types';
import { getDrinkById } from '../actions/getDrinkById';
import { mapIngredientToMeasure } from '../actions/MealById';
import ShareAndFavo from '../components/ShareAndFavo';
import '../App.css';

function DrinkDetails({
  recipes, match, history, getDrinkByIdDispatch, recommendedFoods }) {
  const [recipe, setRecipe] = useState(null);
  const [ingredientToMeasure, setIngredientToMeasure] = useState([]);
  const [loading, setLoading] = useState(true);

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
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <div>
        <h2 data-testid="recipe-title">{recipe.strDrink}</h2>
        <img src={ `${recipe.strDrinkThumb}` } alt="recipe" data-testid="recipe-photo" />
        <ShareAndFavo match={ match } recipe={ recipe } />
        <h2 data-testid="recipe-category">{recipe.strCategory}</h2>
        {recipe.strAlcoholic === 'Alcoholic' && (
          <h2
            data-testid="recipe-category"
          >
            {recipe.strAlcoholic}
          </h2>)}
        {ingredientToMeasure
          .map((item) => item.ingredient && (
            <ul
              data-testid={ `${item.index}-ingredient-name-and-measure` }
              key={ item.index }
            >
              <li>
                { item.ingredient }
              </li>
              <li>
                { item.measure }
              </li>
            </ul>
          ))}
        {/* // O texto de instruções
        deve possuir o atributo data-testid="instructions"; */}
        <p data-testid="instructions">{recipe.strInstructions}</p>
        {/* // O vídeo, presente somente na tela
      de comidas, deve possuir o atributo data-testid="video"; */}

        {/* // O botão de iniciar receita deve possuir o
      atributo data-testid="start-recipe-btn"; */}
        <button
          className="init-btn"
          data-testid="start-recipe-btn"
          type="button"
        >
          Iniciar receita

        </button>
        {/* // O card de receitas recomendadas
      deve possuir o atributo data-testid="${index}-recomendation-card"; */}
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
              <a href={ `/comidas/${item.idMeal}` }>
                <img className="image-recipe" src={ `${item.strMealThumb}` } alt="" />
              </a>
              <h2
                data-testid={ `${item.index}-recomendation-title` }
              >
                {item.strMeal}
              </h2>
            </div>
          ))}
        </div>
      </div>
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
