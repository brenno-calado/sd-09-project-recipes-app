import React, { useEffect, useState } from 'react';
import { objectOf } from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { fetchBeverages } from '../services/fetchRecipes';
import Card from './Card';

function DetailsFood({ recipe }) {
  const [recommends, setRecommends] = useState([]);
  const { strMeal, strMealThumb, strCategory, strInstructions, strYoutube } = recipe;
  const embedId = strYoutube ? strYoutube.split('https://www.youtube.com/watch?v=')[1] : '';

  useEffect(() => {
    const toSlice = 6;
    fetchBeverages().then((data) => setRecommends(data.slice(0, toSlice)));
  });

  const getIngredients = () => {
    const maxNumber = 20;
    const ingredients = [];
    for (let index = 1; index <= maxNumber; index += 1) {
      const ingredient = `strIngredient${index}`;
      const quantity = `strMeasure${index}`;
      if (recipe[ingredient] !== '') {
        ingredients.push({
          name: recipe[ingredient],
          quantity: recipe[quantity],
        });
      }
    }
    return ingredients.map(({ name, quantity }, index) => (
      <li
        key={ name }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        {`${name} - ${quantity}`}
      </li>));
  };

  return (
    <div>
      <img
        src={ strMealThumb }
        alt={ strMeal }
        data-testid="recipe-photo"
      />
      <div>
        <div>
          <h1 data-testid="recipe-title">{strMeal}</h1>
          <h3 data-testid="recipe-category">{strCategory}</h3>
        </div>
        <div>
          <button type="button" data-testid="share-btn">
            <img src={ shareIcon } alt="Share button" />
          </button>
          <button type="button" data-testid="favorite-btn">
            <img src={ blackHeartIcon } alt="Favorite button" />
          </button>
        </div>
        <div>
          <h2>Ingredients</h2>
          <ul>
            { getIngredients() }
          </ul>
        </div>
        <div>
          <h2>Instructions</h2>
          <p data-testid="instructions">{strInstructions}</p>
        </div>
        <div>
          <h2>Video</h2>
          <iframe src={ `https://www.youtube.com/embed/${embedId}` } title="video" frameBorder="0" data-testid="video" />
        </div>
        <div>
          <h2>Recomended</h2>
          {recommends.map((item, index) => (<Card
            cardTestid={ `${index}-recomendation-card` }
            titleTestid={ `${index}-recomendation-title` }
            key={ index }
            item={ item }
            index={ index }
            type="bebidas"
          />))}
        </div>
        <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
      </div>
    </div>
  );
}

DetailsFood.propTypes = {
  recipe: objectOf(),
}.isRequired;

export default DetailsFood;
