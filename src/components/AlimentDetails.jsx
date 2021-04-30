import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeButton from './RecipeButton';
import Recomendations from './Recomendations';
import ShareButton from './ShareButton';
import FavoriteRecipes from './FavoriteRecipes';
import { getIngredients } from '../services/functions';
import '../styles/alimentDetails.css';

function AlimentDetails({ data, recomendation }) {
  const { pathname } = useLocation();
  const { href } = window.location;
  const ingredients = getIngredients(data[0], 'strIngredient');
  const ingredientsMeasures = getIngredients(data[0], 'strMeasure');
  if (pathname.includes('/comidas')) {
    const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = data[0];
    return (
      <div>
        <img src={ strMealThumb } alt="imagem" data-testid="recipe-photo" />
        <h3 data-testid="recipe-title">{ strMeal }</h3>
        <ShareButton dataTestId="share-btn" urlCopied={ href } />
        <FavoriteRecipes data={ data[0] } path={ pathname } />
        <p data-testid="recipe-category">{ strCategory }</p>
        <ul>
          { ingredients.map((ingredient, index) => (
            <li key={ ingredient }>
              <p data-testid={ `${index}-ingredient-name-and-measure` }>
                { ingredient[1] }
              </p>
            </li>))}
          { ingredientsMeasures.map((measure, index) => (
            <li key={ measure }>
              <p data-testid={ `${index}-ingredient-name-and-measure` }>
                { measure[1] }
              </p>
            </li>
          ))}
        </ul>
        <p data-testid="instructions">{ strInstructions }</p>
        <video controls data-testid="video">
          <source src={ strYoutube } type="video/ogg" />
          <track
            default
            kind="captions"
            srcLang="en"
          />
          Sorry, your browser dont support embedded videos.
        </video>
        <Recomendations data={ recomendation } />
        <RecipeButton path={ pathname } ingredients={ ingredients } />
      </div>
    );
  }
  const { strDrink, strInstructions, strDrinkThumb, strAlcoholic, strCategory } = data[0];
  return (
    <div>
      <img src={ strDrinkThumb } alt="imagem" data-testid="recipe-photo" />
      <h3 data-testid="recipe-title">{ strDrink }</h3>
      <p>{ strCategory }</p>
      {
        strAlcoholic === 'Alcoholic'
          ? <p data-testid="recipe-category">Alcoholic</p> : <br />
      }
      <ShareButton />
      <FavoriteRecipes data={ data[0] } path={ pathname } />
      <ul>
        { ingredients.map((ingredient, index) => (
          <li key={ ingredient }>
            <p data-testid={ `${index}-ingredient-name-and-measure` }>
              { ingredient[1] }
            </p>
          </li>))}
        { ingredientsMeasures.map((measure, index) => (
          <li key={ measure }>
            <p data-testid={ `${index}-ingredient-name-and-measure` }>
              { measure[1] }
            </p>
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{ strInstructions }</p>
      <Recomendations data={ recomendation } />
      <RecipeButton path={ pathname } ingredients={ ingredients } />
    </div>
  );
}

AlimentDetails.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  recomendation: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default AlimentDetails;
