import React from 'react';
import { arrayOf } from 'prop-types';
import Cards from './card';
import Recomended from './recommendedRecipes';

export default function CardContainer({ recipes, path, type }) {
  const size = 12;
  return (
    <div className="cards-container">
      {recipes && (recipes.slice(0, size)).map((recipe, index) => {
        const id = path === '/comidas' ? 'idMeal' : 'idDrink';
        const image = path === '/comidas' ? 'strMealThumb' : 'strDrinkThumb';
        const name = path === '/comidas' ? 'strMeal' : 'strDrink';

        return (
          type === 'recomendations' ? <Recomended
            key={ `${path.replace('/', '')}-${index}` }
            image={ recipe[image] }
            name={ recipe[name] }
            index={ index }
            url={ `${path}/${recipe[id]}` }
          /> : <Cards
            key={ `${path.replace('/', '')}-${index}` }
            image={ recipe[image] }
            name={ recipe[name] }
            index={ index }
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
