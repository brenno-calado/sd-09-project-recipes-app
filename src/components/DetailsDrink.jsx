import React, { useEffect, useState } from 'react';
import { objectOf } from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { fetchMeals } from '../services/fetchRecipes';
import Card from './Card';

function DetailsDrink({ recipe }) {
  const [recommends, setRecommends] = useState([]);
  const { strDrink, strDrinkThumb, strAlcoholic, strInstructions } = recipe;

  useEffect(() => {
    const toSlice = 6;
    fetchMeals().then((data) => setRecommends(data.slice(0, toSlice)));
  });

  const getIngredients = () => {
    const ingredients = [];
    const ingreQtt = Object.keys(recipe).filter((item) => item.includes('strIngredient'));
    const measure = Object.keys(recipe).filter((item) => item.includes('strMeasure'));
    ingreQtt.forEach((item, index) => {
      if (recipe[item] !== null && recipe[item] !== '') {
        ingredients.push({
          name: recipe[item],
          quantity: recipe[measure[index]],
        });
      }
    });
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
        src={ strDrinkThumb }
        alt={ strDrink }
        data-testid="recipe-photo"
      />
      <div>
        <div>
          <h1 data-testid="recipe-title">{strDrink}</h1>
          <h3 data-testid="recipe-category">{strAlcoholic}</h3>
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
          <h2>Recomended</h2>
          {recommends.map((item, index) => (<Card
            cardTestid={ `${index}-recomendation-card` }
            titleTestid={ `${index}-recomendation-title` }
            key={ index }
            item={ item }
            index={ index }
            type="comidas"
          />))}
        </div>
        <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
      </div>
    </div>
  );
}

DetailsDrink.propTypes = {
  recipe: objectOf(),
}.isRequired;

export default DetailsDrink;
