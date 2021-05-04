import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import Recommendations from '../components/Recommendations';
import { fetchDetailsDrink } from '../service/cocktailAPI';
import { fetchAllMeals } from '../service/mealAPI';
import '../App.css';

function DrinkRecipe({ match: { params: { id } } }) {
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

  const listIngredients = () => {
    const list = [];
    if (drinking.length !== 0) {
      for (let index = 1; drinking[`strIngredient${index}`] !== null; index += 1) {
        list.push(`
          ${drinking[`strIngredient${index}`]} - ${drinking[`strMeasure${index}`]}
        `);
      }
      return list;
    } return null;
  };

  function msgShare({ target: { id: ide } }) {
    if (ide === 'share') {
      setCopy(true);
      return <span>link copiado!</span>;
    } return null;
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
            >
              {copy ? msgShare() : (<img src={ shareIcon } alt="Share" />) }
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
            >
              <img src={ whiteHeartIcon } alt="Favorit" />
            </button>
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
            <button
              className="start-recipe-btn"
              type="button"
              data-testid="start-recipe-btn"
            >
              Iniciar Receita
            </button>
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
