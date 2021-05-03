import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import PropTypes from 'prop-types';
import RecipesAppContext from '../context/RecipesAppContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/details.css';

const copy = require('clipboard-copy');

function DrinkDetails({ match: { params: { id } } }) {
  const {
    drinkId,
    getDrinkId,
    mealRecomendation,
    setDrinkId,
  } = useContext(RecipesAppContext);

  const [copied, setCopy] = useState(false);

  const history = useHistory();
  const maxRecomendations = 6;

  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const isFavorited = (
    favoriteRecipes !== null ? favoriteRecipes.some(
      (obj) => obj.id === drinkId.idDrink,
    ) : false);
  const [favorited, setFavorited] = useState(isFavorited);

  function handleFavorite(item) {
    console.log(favorited);
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (isFavorited) {
      const newFavorites = favorites
        .filter((drink) => drink.id !== item.idDrink);
      setFavorited(true);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    } else {
      const newFavorites = [favorites, {
        id: item.idDrink,
        type: 'bebida',
        area: item.strArea,
        category: '',
        alcoholicOrNot: item.strAlcoholic,
        name: item.strDrink,
        image: item.strDrinkThumb,
      }];
      setFavorited(false);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    }
  }

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

  useEffect(() => () => {
    setDrinkId({});
  }, [setDrinkId]);

  const ingredientsList = () => {
    const list = [];

    for (let index = 1; drinkId[`strIngredient${index}`] !== null; index += 1) {
      list.push(`
        ${drinkId[`strIngredient${index}`]} - ${drinkId[`strMeasure${index}`]}
      `);
    }
    return list;
  };

  return (
    <div>
      { (drinkId.idDrink === id) ? (
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
            onClick={ () => handleFavorite(drinkId) }
            src={ (isFavorited) ? blackHeartIcon : whiteHeartIcon }
            data-testid="favorite-btn"
          >
            <img
              src={ (isFavorited) ? blackHeartIcon : whiteHeartIcon }
              alt="Favoritar"
            />
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
      ) : (<p className="loading-message">Loading...</p>)}
    </div>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default DrinkDetails;
