import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Recommendations from '../components/Recommendations';
import { fetchDetailsDrink } from '../service/cocktailAPI';
import { fetchAllMeals } from '../service/mealAPI';
import useFavorite from '../effects/useFavorite';
import '../App.css';

function DrinkRecipe({ match: { params: { id } } }) {
  const recipeDone = JSON.parse(localStorage.getItem('doneRecipes'));
  const recipeInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [favoriteState, setFavoriteState] = useState(false);
  const [copy, setCopy] = useState(false);
  const [drinking, setDrinking] = useState([]);
  const [recomendedFood, setRecomendedFood] = useState([]);

  const maxResult = 6;

  useEffect(() => {
    const fetchDrink = async () => {
      const drinkArray = await fetchDetailsDrink(id);
      setDrinking(drinkArray.drinks[0]);
    };
    fetchDrink();
  }, [id]);

  useEffect(() => {
    const fetchRecomended = async () => {
      const recomendedArray = await fetchAllMeals();
      setRecomendedFood(recomendedArray.meals);
    };
    fetchRecomended();
  }, []);

  useFavorite(id, setFavoriteState);

  const recipeData = {
    id,
    type: 'bebida',
    area: '',
    category: drinking.strCategory,
    alcoholicOrNot: drinking.strAlcoholic,
    name: drinking.strDrink,
    image: drinking.strDrinkThumb,
  };

  function addFavorite() {
    favoriteRecipes.push(recipeData);
    localStorage
      .setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    setFavoriteState(true);
  }

  function removeFavorite() {
    setFavoriteState(false);
    const favoriteRemove = favoriteRecipes.filter((drink) => drink.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRemove));
  }

  const removeButton = () => (
    <button
      type="button"
      onClick={ () => removeFavorite() }
    >
      <img data-testid="favorite-btn" src={ blackHeartIcon } alt="Favorit" />
    </button>
  );

  const addButton = () => (
    <button
      type="button"
      onClick={ () => addFavorite() }
    >
      <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="Favorit" />
    </button>
  );

  const listIngredients = () => {
    const list = [];
    for (let index = 1; drinking[`strIngredient${index}`] !== null; index += 1) {
      list.push(`
        ${drinking[`strIngredient${index}`]} - ${drinking[`strMeasure${index}`]}
      `);
    }
    return list;
  };

  function msgShare() {
    setCopy(true);
    // https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
    return navigator.clipboard.writeText(window.location.href);
  }

  function buttonVerify() {
    if (recipeInProgress && Object.keys(recipeInProgress.cocktails)[0] === id) {
      return (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
        >
          Continuar Receita
        </button>);
    }
    if (!recipeDone || recipeDone.find((recipe) => id !== recipe.id)) {
      return (
        <Link
          data-testid="start-recipe-btn"
          to={ `${window.location.pathname}/in-progress` }
          className="start-recipe-btn"
        >
          Iniciar Receita
        </Link>);
    }
  }

  return (
    <div>
      { drinking.length !== 0 ? (
        <>
          <img
            width="100%"
            alt="recipe"
            data-testid="recipe-photo"
            src={ drinking.strDrinkThumb }
          />
          <div className="heading">
            <h3
              data-testid="recipe-title"
            >
              {drinking.strDrink}
            </h3>
            <button
              id="share"
              type="button"
              data-testid="share-btn"
              onClick={ () => msgShare() }
            >
              {copy ? (
                <span>Link copiado!</span>
              ) : (<img src={ shareIcon } alt="Share" />)}
            </button>
            {favoriteState ? removeButton() : addButton()}
          </div>
          <article className="recipe-body">
            <span
              data-testid="recipe-category"
            >
              {`${drinking.strCategory} - ${drinking.strAlcoholic}`}
            </span>
            <h4>Ingredientes</h4>
            <ul className="ingredients-list">
              {listIngredients().map((ingredient, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {ingredient}
                </li>
              ))}
            </ul>
            <h4>Instruções</h4>
            <p data-testid="instructions">{drinking.strInstructions}</p>
            <br />
            <h3>Recomendação</h3>
            <Recommendations recommendations={ recomendedFood.slice(0, maxResult) } />
            { buttonVerify() }
          </article>
        </>
      ) : null }
    </div>
  );
}

DrinkRecipe.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default DrinkRecipe;
