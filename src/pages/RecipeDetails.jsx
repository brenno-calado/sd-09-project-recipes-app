import React, { useContext, useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ReactPlayer from 'react-player';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesAppContext from '../context/RecipesAppContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../styles/details.css';

const copy = require('clipboard-copy');

function RecipeDetails({ match: { params: { id } } }) {
  const {
    isFetching,
    mealId,
    getMealId,
    drinkRecomendation,
  } = useContext(RecipesAppContext);

  const [copied, setCopy] = useState(false);

  const history = useHistory();
  const maxRecomendations = 6;

  function renderMessage() {
    return (
      <span>Link copiado!</span>
    );
  }

  function shareButtonClick() {
    setCopy(true);
    copy(`http://localhost:3000${history.location.pathname}`);
    renderMessage();
  }

  useEffect(() => {
    async function getMealById() {
      await getMealId(id);
    }
    getMealById();
  }, [getMealId, id]);

  const ingredientsList = () => {
    const list = [];

    for (let index = 1; mealId[`strIngredient${index}`] !== ''; index += 1) {
      list.push(`
        ${mealId[`strIngredient${index}`]} - ${mealId[`strMeasure${index}`]}
      `);
    }
    return list;
  };

  return (
    <div>
      { (!(isFetching) && (mealId !== null)) && (
        <div>
          <img
            data-testid="recipe-photo"
            className="recipe-photo"
            alt={ mealId.strMeal }
            src={ mealId.strMealThumb }
          />
          <h3 data-testid="recipe-title" className="recipe-title">{ mealId.strMeal }</h3>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ shareButtonClick }
          >
            { copied ? renderMessage() : (<img src={ shareIcon } alt="Compartilhar" />) }
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
          >
            <img src={ whiteHeartIcon } alt="Favoritar" />
          </button>
          <span data-testid="recipe-category">{ mealId.strCategory }</span>
          <ul className="list-ingredients">
            { ingredientsList().map((ingredients, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {ingredients}
              </li>
            ))}
          </ul>
          <p data-testid="instructions" className="instructions">
            { mealId.strInstructions }
          </p>
          <ReactPlayer
            url={ mealId.strYoutube }
            data-testid="video"
            width="100%"
          />
          <Carousel width="100%">
            { drinkRecomendation.slice(0, maxRecomendations).map((drink, index) => (
              <Carousel.Item key={ index } data-testid={ `${index}-recomendation-card` }>
                <img alt="Recomendation" src={ drink.strDrinkThumb } />
                <Carousel.Caption>
                  <p
                    data-testid={ `${index}-recomendation-title` }
                  >
                    {drink.strDrink}
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            )) }
          </Carousel>
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="button-start-recipe"
          >
            Iniciar Receita
          </button>
        </div>
      ) }
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default RecipeDetails;
