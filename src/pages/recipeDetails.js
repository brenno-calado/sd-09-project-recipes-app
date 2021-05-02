import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import getFoodsAndDrinks from '../services/servicesAPI';
import IngredientsList from '../components/ingredientList';
import CarouselContainer from '../components/recContainer';
import StartButton from '../components/startEndButton';

export default function RecipeDetails() {
  const { id } = useParams();
  const { pathname } = window.location;
  const isFood = (pathname.split('/')[1] === 'comidas');
  const recPath = isFood ? '/bebidas' : '/comidas';
  const [recipe, setRecipe] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  useEffect(() => {
    async function getRecipe() {
      if (isFood) {
        setRecipe(await getFoodsAndDrinks('meals', 'getById', id));
        setRecomendations(await getFoodsAndDrinks('drinks', 'getAll'));
      }
      if (!isFood) {
        setRecipe(await getFoodsAndDrinks('drinks', 'getById', id));
        setRecomendations(await getFoodsAndDrinks('meals', 'getAll'));
      }
    }
    getRecipe();
  }, [isFood, id]);
  const type = isFood ? 'strMeal' : 'strDrink';
  const limit = 6;
  return (
    recipe.length > 0
      ? (
        <div>
          <img
            src={ recipe[0][`${type}Thumb`] }
            alt={ recipe[0][type] }
            width="400px"
            data-testid="recipe-photo"
          />
          <h1
            data-testid="recipe-title"
          >
            { recipe[0][type] }
          </h1>
          <button type="button" data-testid="share-btn">Compartilhar</button>
          <button type="button" data-testid="favorite-btn">Favoritar</button>
          <h3
            data-testid="recipe-category"
          >
            {recipe[0].strCategory}
            {!isFood && recipe[0].strAlcoholic}
          </h3>
          <IngredientsList recipe={ recipe[0] } />
          <p data-testid="instructions">{recipe[0].strInstructions}</p>
          {isFood && <iframe data-testid="video" width="560" height="315" src={ `https://www.youtube.com/embed/${recipe[0].strYoutube.split('=')[1]}` } title={ recipe[0].strMeal } frameBorder="0" allow="accelerometer; encrypted-media; picture-in-picture" allowFullScreen />}
          <StartButton />
          <CarouselContainer
            recipes={ recomendations.slice(0, limit) }
            path={ recPath }
          />
        </div>)
      : <h1>Loading...</h1>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
}.isRequired;
