import React, { useContext } from 'react';
import { MyContext } from '../MyContext';
import Header from './Header';

function MealCard() {
  const { data, categories } = useContext(MyContext);

  const limitMealsRender = 11;
  const limitCategory = 4;

  // strMealThumb -- strMeal -- strCategory
  return (
    <div>
      <Header />
      <button type="button">All</button>
      {categories.map((categorie, index) => (index <= limitCategory ? (
        <button
          data-testid={ `${categorie.strCategory}-category-filter` }
          type="button"
          key={ categorie.strCategory }
        >
          { categorie.strCategory }
        </button>
      ) : null))}
      {data.map((element, index) => (
        index <= limitMealsRender ? (
          <div className="text-center" key={ element.strMeal }>
            <img
              className="img-thumbnail img-fluid"
              src={ element.strMealThumb }
              alt={ element.strMeal }
            />
            <h1>{ element.strMeal }</h1>
          </div>
        ) : null
      ))}
    </div>
  );
}

export default MealCard;
