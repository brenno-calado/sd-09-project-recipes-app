import React, { useContext } from 'react';
import { MyContext } from '../MyContext';
import { Header } from '.';

function DrinkCard() {
  const { data, categories, filterByCategory } = useContext(MyContext);

  const limitDrinksRender = 11;
  const limitCategory = 4;
  // strDrinkThumb -- strDrink -- strCategory
  return (
    <div>
      <Header />
      <div className="text-center">
        <button type="button">All</button>
        {categories.map((categorie, index) => (index <= limitCategory ? (
          <button
            data-testid={ `${categorie.strCategory}-category-filter` }
            type="button"
            key={ categorie.strCategory }
            value={ categorie.strCategory }
            onClick={ ({ target }) => filterByCategory(target, 'bebidas') }
          >
            { categorie.strCategory }
          </button>
        ) : null))}
      </div>
      {data.map((element, index) => (
        index <= limitDrinksRender ? (
          <div
            data-testid={ `${index}-recipe-card` }
            className="text-center"
            key={ element.strMeal }
          >
            <img
              data-testid={ `${index}-card-img` }
              className="img-thumbnail img-fluid"
              src={ element.strDrinkThumb }
              alt={ element.strDrink }
            />
            <h1 data-testid={ `${index}-card-name` }>{ element.strDrink }</h1>
          </div>
        ) : null
      ))}

    </div>
  );
}

export default DrinkCard;
