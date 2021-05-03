import React from 'react';
import { arrayOf } from 'prop-types';
import Cards from './card';

export default function CardContainer({ recipes, path, cardType, redirectCallback }) {
  const size = 12;

  if (cardType === 'ingredient') {
    return (
      <div className="cards-container">
        {recipes && (recipes.slice(0, size)).map((item, index) => {
          const foodPath = '/explorar/comidas/ingredientes';
          const site = path === foodPath ? 'themealdb' : 'thecocktaildb';
          const key = path === foodPath ? 'strIngredient' : 'strIngredient1';

          return (
            <Cards
              key={ `${path.replace('/', '')}-${index}` }
              image={ `https://www.${site}.com/images/ingredients/${item[key]}-Small.png` }
              name={ item[key] }
              index={ index }
              cardType={ cardType }
              url=""
              redirectCallback={ redirectCallback }
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className="cards-container">
      {recipes && (recipes.slice(0, size)).map((recipe, index) => {
        const id = path === '/comidas' ? 'idMeal' : 'idDrink';
        const image = path === '/comidas' ? 'strMealThumb' : 'strDrinkThumb';
        const name = path === '/comidas' ? 'strMeal' : 'strDrink';

        return (
          <Cards
            key={ `${path.replace('/', '')}-${index}` }
            image={ recipe[image] }
            name={ recipe[name] }
            index={ index }
            cardType={ cardType }
            url={ `${path}/${recipe[id]}` }
          />
        );
      })}
    </div>
  );
}

CardContainer.propTypes = {
  image: arrayOf,
}.isRequired;
