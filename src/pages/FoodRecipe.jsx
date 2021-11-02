import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Recommendations from '../components/Recommendations';
import { fetchDetailsFood } from '../service/mealAPI';
import { fetchAllDrinks } from '../service/cocktailAPI';
import useFavorite from '../effects/useFavorite';
import '../App.css';

function FoodRecipe({ match: { params: { id } } }) {
  const recipeDone = JSON.parse(localStorage.getItem('doneRecipes'));
  const recipeInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [favoriteState, setFavoriteState] = useState(false);
  const [copy, setCopy] = useState(false);
  const [food, setFood] = useState([]);
  const [recomendedDrink, setRecomendedDrink] = useState([]);

  const maxResult = 6;

  useEffect(() => {
    const fetchFood = async () => {
      const foodArray = await fetchDetailsFood(id);
      console.log('aqui');
      setFood(foodArray.meals[0]);
      console.log(foodArray);
    };
    fetchFood();
  }, [id]);

  useEffect(() => {
    const fetchRecomended = async () => {
      const recomendedArray = await fetchAllDrinks();
      setRecomendedDrink(recomendedArray.drinks);
      console.log(recomendedArray);
    };
    fetchRecomended();
  }, []);

  useFavorite(id, setFavoriteState);

  const recipeData = {
    id,
    type: 'comida',
    area: food.strArea,
    category: food.strCategory,
    alcoholicOrNot: '',
    name: food.strMeal,
    image: food.strMealThumb,
  };

  function addFavorite() {
    favoriteRecipes.push(recipeData);
    localStorage
      .setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    setFavoriteState(true);
  }

  function removeFavorite() {
    setFavoriteState(false);
    const favoriteRemove = favoriteRecipes.filter((foodRecipe) => foodRecipe.id !== id);
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
    for (let index = 1; food[`strIngredient${index}`] !== null; index += 1) {
      list.push(`
        ${food[`strIngredient${index}`]} - ${food[`strMeasure${index}`]}
      `);
    }
    return list;
  };

  function sliceYoutube() {
    const { strYoutube } = food;
    const equalSignIndex = 32;
    const slicedYoutube = strYoutube.slice(equalSignIndex);
    return slicedYoutube;
  }

  function msgShare() {
    setCopy(true);
    // https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
    return navigator.clipboard.writeText(window.location.href);
  }

  function buttonVerify() {
    if (recipeInProgress && Object.keys(recipeInProgress.meals)[0] === id) {
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
      { food.length !== 0 ? (
        <>
          <img
            width="100%"
            alt="recipe"
            data-testid="recipe-photo"
            src={ food.strMealThumb }
          />
          <div className="heading">
            <h3
              data-testid="recipe-title"
            >
              {food.strMeal}
            </h3>
            <div>
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
          </div>
          <article className="recipe-body">
            <span
              className="category"
              data-testid="recipe-category"
            >
              {food.strCategory}
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
            <p data-testid="instructions">{food.strInstructions}</p>
            <h3>Video</h3>
            <iframe
              data-testid="video"
              className="center"
              width="100%"
              height="315"
              src={ `http://www.youtube.com/embed/${sliceYoutube()}` }
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer;
              autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <h3>Recomendação</h3>
            <Recommendations recommendations={ recomendedDrink.slice(0, maxResult) } />
            { buttonVerify() }
          </article>
        </>
      ) : null }
    </div>
  );
}

FoodRecipe.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default FoodRecipe;
