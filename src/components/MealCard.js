import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from '../MyContext';
import Header from './Header';
import { fetchToMainScreen } from '../services/fetchAPI';

function MealCard() {
  const { data, categories, filterByCategory, setData } = useContext(MyContext);

  const limitMealsRender = 11;
  const limitCategory = 4;

  // strMealThumb -- strMeal -- strCategory
  return (
    <div>
      <Header />
      <div className="text-center">
        <button
          type="button"
          onClick={ () => (
            fetchToMainScreen('/comidas').then((result) => setData(result))
          ) }
        >
          All
        </button>
        {categories.map((categorie, index) => (index <= limitCategory ? (
          <button
            data-testid={ `${categorie.strCategory}-category-filter` }
            type="button"
            key={ categorie.strCategory }
            value={ categorie.strCategory }
            onClick={ ({ target }) => filterByCategory(target, '/comidas') }
          >
            { categorie.strCategory }
          </button>
        ) : null))}
      </div>
      {data.map((element, index) => (
        index <= limitMealsRender ? (
          <Link to={ `/comidas/${element.idMeal}` }>
            <div
              data-testid={ `${index}-recipe-card` }
              className="text-center"
              key={ element.strMeal }
            >
              <img
                data-testid={ `${index}-card-img` }
                className="img-thumbnail img-fluid"
                src={ element.strMealThumb }
                alt={ element.strMeal }
              />
              <h1 data-testid={ `${index}-card-name` }>{ element.strMeal }</h1>
            </div>
          </Link>
        ) : null
      ))}
    </div>
  );
}

export default MealCard;
