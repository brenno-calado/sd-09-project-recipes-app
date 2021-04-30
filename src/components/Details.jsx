import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Jumbotron } from 'react-bootstrap';
import { getPageFromURL } from '../services/others';
import './Details.css';

function Details({ detailsContext }) {
  const { recipe } = detailsContext;

  function getIngredientsLiElements() {
    const maxIngredients = 20;
    const ingredientsList = [];
    for (let index = 1; index < maxIngredients; index += 1) {
      if (recipe[`strIngredient${index}`]) {
        ingredientsList[index] = (
          <li data-testid={ `${index - 1}-ingredient-name-and-measure` } key={ index }>
            {`${recipe[`strIngredient${index}`]} - ${recipe[`strMeasure${index}`]}`}
          </li>
        );
      }
    }
    return ingredientsList
      .filter((ingr) => ingr.props.children !== null
        && ingr.props.children !== ''
        && ingr.props.children !== undefined);
  }

  return (
    <Jumbotron>
      <Container>
        <div className="details-main">
          { getPageFromURL() ? (
            <h2 data-testid="recipe-title" className="display-4">{recipe.strMeal}</h2>)
            : (
              <h2 data-testid="recipe-title" className="display-4">
                {recipe.strDrink}
              </h2>
            )}
          { getPageFromURL() ? (
            <p data-testid="recipe-category" className="lead">{recipe.strCategory}</p>)
            : (
              <p data-testid="recipe-category" className="lead">
                {recipe.strAlcoholic}
              </p>
            )}
          { getPageFromURL() ? (
            <img
              data-testid="recipe-photo"
              src={ recipe.strMealThumb }
              alt="img"
              className="details-img"
            />)
            : (
              <img
                data-testid="recipe-photo"
                src={ recipe.strDrinkThumb }
                alt="img"
                className="details-img"
              />)}
          <br />
          <Button data-testid="share-btn" type="button" color="primary" className="btn">
            Share
          </Button>
          <Button
            data-testid="favorite-btn"
            type="button"
            color="primary"
            className="btn"
          >
            Favorite it
          </Button>
          <Button
            type="button"
            data-testid="start-recipe-btn"
            color="primary"
            className="btn"
          >
            Start Recipe
          </Button>
        </div>
        <div>
          <h4>ingredients</h4>
          <ul>
            {getIngredientsLiElements()}
          </ul>
        </div>
        <div>
          <h4>Instructions</h4>
          <p data-testid="instructions">{recipe.strInstructions}</p>
        </div>
        <hr className="my-2" />
      </Container>
    </Jumbotron>
  );
}

Details.propTypes = { detailsContext: PropTypes.object }.isRequired;

export default Details;
