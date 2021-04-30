import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { getPageFromURL } from '../services/others';
import './RecomendedRecipes.css';

function RecomendedRecipes({ detailsContext }) {
  const { recomendationRecipesList, fetchRecomendationMealsAndDrinks } = detailsContext;

  useEffect(() => {
    if (!recomendationRecipesList) {
      fetchRecomendationMealsAndDrinks();
    }
  }, [recomendationRecipesList, fetchRecomendationMealsAndDrinks]);

  function createCard(classNameObj, recipe, index) {
    console.log(recipe.strDrinkThumb, recipe.strMealThumb);
    return (
      <Card style={ { width: '18rem' } } key={ index } className={ classNameObj }>
        { !getPageFromURL() ? (
          <Card.Img variant="top" src={ recipe.strMealThumb } />)
          : (<Card.Img variant="top" src={ recipe.strDrinkThumb } />)}
        <Card.Body>
          { !getPageFromURL() ? (
            <Card.Title>{ recipe.strMeal }</Card.Title>)
            : (<Card.Title>{ recipe.strDrink }</Card.Title>)}
          { !getPageFromURL() ? (
            <Card.Text>{ recipe.strCategory }</Card.Text>)
            : (<Card.Text>{ recipe.strAlcoholic }</Card.Text>)}
        </Card.Body>
      </Card>
    );
  }

  function createRecomendedCards(recipesList) {
    const maxCardsVisible = 2;
    const arrayOfHTMLCards = [];
    for (let index = 0; index < recipesList.length; index += 1) {
      if (index < maxCardsVisible) {
        arrayOfHTMLCards[index] = createCard('card', recipesList[index], index);
      } else {
        arrayOfHTMLCards[index] = createCard('card hidden', recipesList[index], index);
      }
    }
    return arrayOfHTMLCards;
  }

  return (
    <section className="cards-section-container">
      <h2 className="card-container-title">Recomended Recipes</h2>
      { !recomendationRecipesList ? <p>Loading...</p> : (
        <div className="card-container">
          {createRecomendedCards(recomendationRecipesList)}
        </div>
      ) }
    </section>
  );
}

RecomendedRecipes.propTypes = { recipesList: PropTypes.array }.isRequired;

export default RecomendedRecipes;
