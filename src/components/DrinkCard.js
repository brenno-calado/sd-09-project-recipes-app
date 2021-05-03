import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from '../MyContext';
import Header from './Header';
import { fetchToMainScreen } from '../services/fetchAPI';

function DrinkCard() {
  const { data, categories, filterByCategory, setData } = useContext(MyContext);

  const limitDrinksRender = 11;
  const limitCategory = 4;

  // strDrinkThumb -- strDrink -- strCategory
  return (
    <div>
      <Header />
      <div className="text-center">
        <button
          onClick={ () => (
            fetchToMainScreen('/bebidas').then((result) => setData(result))
          ) }
          type="button"
        >
          All
        </button>
        {categories.map((categorie, index) => (index <= limitCategory ? (
          <button
            data-testid={ `${categorie.strCategory}-category-filter` }
            type="button"
            key={ categorie.strCategory }
            value={ categorie.strCategory }
            onClick={ ({ target }) => filterByCategory(target, '/bebidas') }
          >
            { categorie.strCategory }
          </button>
        ) : null))}
      </div>
      {data.map((element, index) => (
        index <= limitDrinksRender ? (
          <Link to={ `/bebidas/${element.idDrink}` }>
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
          </Link>
        ) : null
      ))}

    </div>
  );
}

export default DrinkCard;
