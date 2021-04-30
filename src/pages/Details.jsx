import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import { mealsByIdThunk, cocktailsByIdThunk } from '../redux/actions';
import RecommendedRecipes from '../components/RecommendedRecipes';
import StartRecipeButton from '../components/StartRecipeButton';
import FavoriteButton from '../components/FavoriteButton';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function Details({
  history,
  match: { params: { id } },
  mealsById,
  cocktailsById,
  recipeType,
  recipe,
}) {
  const [ingredients, setIngredients] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  const getIngredients = () => {
    const chave = 'strIngredient';
    const valor = 'strMeasure';
    const arrayKeys = Object.keys(recipe);
    const ingredientKeys = arrayKeys.filter((key) => key.includes(chave));
    const measureKeys = arrayKeys.filter((key) => key.includes(valor));
    const obj = {};
    for (let index = 0; index < ingredientKeys.length; index += 1) {
      obj[recipe[ingredientKeys[index]]] = recipe[measureKeys[index]];
    }
    setIngredients(Object.entries(obj));
  };

  const getLink = async () => {
    const magicNumber = 4000;
    const { location: { pathname } } = history;
    const link = `http://localhost:3000${pathname}`;
    await navigator.clipboard.writeText(link);
    setShowMessage(true);
    setTimeout(() => { setShowMessage(false); }, magicNumber);
  };

  useEffect(() => {
    if (recipeType === 'meals') {
      mealsById(id);
    }
    if (recipeType === 'cocktails') {
      cocktailsById(id);
    }
  }, []);

  useEffect(() => {
    getIngredients();
  }, [recipe]);

  return (
    <section>
      <h1>Detalhes da Receita</h1>
      <img
        src={ recipeType === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb }
        alt="current recipe"
        data-testid="recipe-photo"
      />
      <div>
        <button
          type="button"
          onClick={ getLink }
          data-testid="share-btn"
        >
          <img src={ shareIcon } alt="botao de compartilhar" />
          Compartilhar
        </button>
      </div>
      <FavoriteButton />
      { showMessage && <p>Link copiado!</p> }
      <div>
        <p data-testid="recipe-title">
          { recipeType === 'meals' ? recipe.strMeal : recipe.strDrink }
        </p>
        <p data-testid="recipe-category">{ recipe.strCategory }</p>
        { recipeType === 'cocktails' && <p>{ recipe.strAlcoholic }</p>}
      </div>
      <div>
        <ul>
          {
            recipe.length !== 0 && ingredients !== undefined
            && ingredients.map((ingredient, index) => {
              if (ingredient[0] === '') {
                return;
              }
              return (
                <li
                  key={ ingredient }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  { `${ingredient[0]}: ${ingredient[1]}` }
                </li>
              );
            })
          }
        </ul>
      </div>
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
});

const mapDispatchToProps = (dispatch) => ({
  mealsById: (id) => dispatch(mealsByIdThunk(id)),
  cocktailsById: (id) => dispatch(cocktailsByIdThunk(id)),
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
