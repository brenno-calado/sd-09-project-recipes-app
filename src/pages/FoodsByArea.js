import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import FooterMenu from '../components/FooterMenu';
import { fetchMealsArea, fetchMealsLocalArea, fetchMealsApi } from '../services';

function FoodsByArea() {
  const [loading, isFetching] = useState(true);
  const [area, setArea] = useState('');
  const [local, setLocal] = useState('All');
  const [data, setData] = useState(undefined);

  function renderCards() {
    return (
      <div className="container-cards">
        {data.map((meal, index) => (
          <Link key={ meal.idMeal } to={ `/comidas/${meal.idMeal}` }>
            <div
              key={ meal.idMeal }
              data-testid={ `${index}-recipe-card` }
              className="card"
              style={ {
                width: '15rem',
                alignItems: 'center',
                marginBottom: '5px',
                marginTop: '10px',
              } }
            >
              <img
                src={ meal.strMealThumb }
                data-testid={ `${index}-card-img` }
                alt={ `${meal.strMeal} recipe` }
                className="card-img-top"
                style={ { width: '14rem', margin: '4px' } }
              />
              <h5
                data-testid={ `${index}-card-name` }
                className="card-title"
              >
                {meal.strMeal}
              </h5>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  function renderDropdown() {
    return (
      <div>
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ (event) => setLocal(event.target.value) }
        >
          <option
            value="All"
            key={ -1 }
            data-testid="All-option"
            selected
          >
            All
          </option>
          { area.map((country, index) => (
            <option
              value={ country.strArea }
              className="dropdown-item"
              key={ index }
              data-testid={ `${country.strArea}-option` }
            >
              {country.strArea}
            </option>))}
        </select>
      </div>
    );
  }

  useEffect(() => {
    async function fetchArea() {
      const number12 = 12;

      const areas = await fetchMealsLocalArea();

      setArea(areas);

      if (local === 'All') {
        const dataMeals = await fetchMealsApi();
        const mealResult = dataMeals.slice(0, number12);
        setData(mealResult);
      } else {
        const countryResult = await fetchMealsArea(local);
        const mealResult = countryResult.splice(0, number12);

        setData(mealResult);
      }

      return isFetching(false);
    }
    fetchArea();
  }, [local]);

  return (
    <>
      <Header pageName="Explorar Origem" />
      {loading ? <h1>Loading...</h1> : renderDropdown()}
      { data && renderCards()}
      <FooterMenu />
    </>
  );
}

export default FoodsByArea;
