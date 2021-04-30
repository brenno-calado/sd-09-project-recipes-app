import React, { useContext } from 'react';
import { MyContext } from '../MyContext';
import Header from './Header';

function DrinkCard() {
  const { data, categories } = useContext(MyContext);

  const limitDrinksRender = 11;
  const limitCategory = 4;
  // strDrinkThumb -- strDrink -- strCategory
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
        index <= limitDrinksRender ? (
          <div className="text-center" key={ element.strMeal }>
            <img
              className="img-thumbnail img-fluid"
              src={ element.strDrinkThumb }
              alt={ element.strDrink }
            />
            <h1>{ element.strDrink }</h1>
          </div>
        ) : null
      ))}

    </div>
  );
}

export default DrinkCard;
