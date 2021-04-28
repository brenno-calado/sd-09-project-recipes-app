import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { objectOf, bool } from 'prop-types';
import { getMealById, mapIngredientToMeasure } from '../actions/MealById';

function FoodDetails({ recipes, match, history, getMealByIdDispatch, recommendedFoods }) {
  const [recipe, setRecipe] = useState(null);
  const [ingredientToMeasure, setIngredientToMeasure] = useState([]);
  const [loading, setLoading] = useState(true);

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
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <div>
        {/* // O título deve possuir o atributo data-testid="recipe-title"; */}
        <h2 data-testid="recipe-title">{recipe.strMeal}</h2>
        {/* // A foto deve possuir o atributo data-testid="recipe-photo"; */}
        <img src={ `${recipe.strMealThumb}` } alt="recipe" data-testid="recipe-photo" />
        {/* // O botão de compartilhar deve
        possuir o atributo data-testid="share-btn"; */}
        <button type="button" data-testid="share-btn">Compartilhar</button>
        {/* // O botão de favoritar
      deve possuir o atributo data-testid="favorite-btn"; */}
        <button type="button" data-testid="favorite-btn">Favoritar</button>
        {/* O texto da categoria
        deve possuir o atributo data-testid="recipe-category"; */}
        <h2 data-testid="recipe-category">{recipe.strCategory}</h2>
        {/* // Os ingredientes
      devem possuir o atributo data-testid="${index}-ingredient-name-and-measure"; */}
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
        <p>{recipe.strInstructions}</p>
        {/* // O vídeo, presente somente na tela
      de comidas, deve possuir o atributo data-testid="video"; */}
        <a
          data-testid="video"
          href={ `${recipe.strYoutube}` }
        >
          Video Receita
        </a>

        {/* // O botão de iniciar receita deve possuir o
      atributo data-testid="start-recipe-btn"; */}
        <button type="button">Iniciar receita</button>
        {/* // O card de receitas recomendadas
      deve possuir o atributo data-testid="${index}-recomendation-card"; */}
        {recommendedFoods.map((item) => (
          <div key={ `${item.index}` } className={ `${item.index}-recomendation-card` }>
            <a href={ `/comidas/${item.idMeal}` }>
              <img src={ `${item.strMealThumb}` } alt="" />
              <h2>{item.strMeal}</h2>

            </a>
          </div>
        ))}
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
  getMealByIdDispatch: (ID) => dispatch(getMealById(ID)),
});
FoodDetails.propTypes = {
  recipes: objectOf(),
  loading: bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(FoodDetails);
