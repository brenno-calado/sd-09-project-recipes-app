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
  const MAX_SLICE_YOUTUBE = 11;
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
        <p data-testid="instructions">{recipe.strInstructions}</p>
        {/* // O vídeo, presente somente na tela
      de comidas, deve possuir o atributo data-testid="video"; */}
        { recipe.strYoutube && (<iframe
          width="560"
          height="315"
          src={ `https://www.youtube.com/embed/${recipe.strYoutube
            .slice(recipe
              .strYoutube.length - MAX_SLICE_YOUTUBE, recipe.strYoutube.length)}` }
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay;
          clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />)}

        {/* // O botão de iniciar receita deve possuir o
      atributo data-testid="start-recipe-btn"; */}
        <button type="button" data-testid="start-recipe-btn">Iniciar receita</button>
        {/* // O card de receitas recomendadas
      deve possuir o atributo data-testid="${index}-recomendation-card"; */}
        {recommendedFoods.map((item) => (
          <div key={ `${item.index}` } data-testid={ `${item.index}-recomendation-card` }>
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
