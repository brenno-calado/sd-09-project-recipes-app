import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import PropTypes from 'prop-types';
import RecipesAppContext from '../context/RecipesAppContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../styles/details.css';

const copy = require('clipboard-copy');

function DrinkDetails({ match: { params: { id } } }) {
  const {
    isFetching,
    drinkId,
    getDrinkId,
    mealRecomendation,
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
    getDrinkId(id);
  }, [getDrinkId, id]);

  const ingredientsList = () => {
    const list = [];

    for (let index = 1; drinkId[`strIngredient${index}`] !== ''; index += 1) {
      list.push(`
        ${drinkId[`strIngredient${index}`]} - ${drinkId[`strMeasure${index}`]}
      `);
    }
    return list;
  };

  return (
    <div>
      { (!(isFetching) && (drinkId !== null)) && (
        <div>
          <img
            data-testid="recipe-photo"
            className="recipe-photo"
            alt={ drinkId.strDrink }
            src={ drinkId.strDrinkThumb }
          />
          <h3
            data-testid="recipe-title"
            className="recipe-title"
          >
            { drinkId.strDrink }
          </h3>
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
          <span data-testid="recipe-category">{ drinkId.strAlcoholic }</span>
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
            { drinkId.strInstructions }
          </p>
          <Carousel>
            { mealRecomendation.slice(0, maxRecomendations).map((meal, index) => (
              <Carousel.Item key={ index } data-testid={ `${index}-recomendation-card` }>
                <img alt="Recomendation" src={ meal.strMealThumb } />
                <Carousel.Caption>
                  <p
                    data-testid={ `${index}-recomendation-title` }
                  >
                    {meal.strMeal}
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

DrinkDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default DrinkDetails;
