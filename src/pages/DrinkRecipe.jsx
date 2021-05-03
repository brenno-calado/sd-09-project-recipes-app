import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { fetchDetailsDrink, fetchAllDrinks } from '../service/cocktailAPI';
import RecipeCard from '../components/RecipeCard';

function DrinkRecipe({ match: { path, params: { id } } }) {
  const [copy, setCopy] = useState(false);
  const [drink, setDrink] = useState([]);
  const [recomendedDrink, setRecomendedDrink] = useState([]);

  const maxResult = 6;

  useEffect(() => {
    const fetchDrink = async () => {
      const drinkArray = await fetchDetailsDrink(id);
      setDrink(drinkArray.meals[0]);
    };
    fetchDrink();
  }, [id]);

  useEffect(() => {
    const fetchRecomended = async () => {
      const recomendedArray = await fetchAllDrinks();
      setRecomendedDrink(recomendedArray.meals);
    };
    fetchRecomended();
  }, []);

  const listIngredients = () => {
    const list = [];
    if (drink.length !== 0) {
      for (let index = 1; drink[`strIngredient${index}`] !== ''; index += 1) {
        list.push(`
          ${drink[`strIngredient${index}`]} - ${drink[`strMeasure${index}`]}
        `);
      }
      return list;
    } return null;
  };

  function sliceYoutube() {
    const { strYoutube } = drink;
    const equalSignIndex = 32;
    const slicedYoutube = strYoutube.slice(equalSignIndex);
    return slicedYoutube;
  }

  function recomended() {
    return recomendedDrink.slice(0, maxResult)
      .map((meal, index) => (
        <RecipeCard
          data-testid={ `${index}-recomendation-card` }
          index={ index }
          key={ meal.idMeal }
          name={ meal.strMeal }
          image={ meal.strMealThumb }
          path={ path }
          id={ meal.idMeal }
        />));
  }

  function msgShare({ target: { id: ide } }) {
    if (ide === 'share') {
      setCopy(true);
      return <span>link copiado!</span>;
    } return null;
  }

  return (
    <div>
      { drink.length !== 0 ? (
        <>
          <img
            alt="recipe"
            data-testid="recipe-photo"
            src={ drink.strMealThumb }
          />
          <h3
            data-testid="recipe-title"
          >
            {drink.strMeal}
          </h3>
          <button
            id="share"
            type="button"
            data-testid="share-btn"
          >
            {copy ? msgShare() : (<img src={ shareIcon } alt="Share" />) }
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
          >
            <img src={ whiteHeartIcon } alt="Favorit" />
          </button>
          <span data-testid="recipe-category">{drink.strCategory}</span>
          <h4>ingredientes</h4>
          <ul>
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
          <p data-testid="instructions">{drink.strInstructions}</p>
          <h3>Video</h3>
          <iframe
            data-testid="video"
            className="center"
            width="300"
            height="315"
            src={ `http://www.youtube.com/embed/${sliceYoutube()}` }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer;
              autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <br />
          <h3>Recomendação</h3>
          {recomended()}
          <button
            type="button"
            data-testid="start-recipe-btn"
          >
            Iniciar Receita
          </button>
        </>
      ) : null }
    </div>
  );
}

DrinkRecipe.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default DrinkRecipe;
