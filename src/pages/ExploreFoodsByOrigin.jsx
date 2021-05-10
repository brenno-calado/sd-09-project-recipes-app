import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import { fetchAreas, fetchMealsByArea,
  fetchMealRecomendation } from '../services/MealApi';

function ExploreFoodsByOrigin() {
  const [options, setoptions] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetchAreas().then((response) => {
      setoptions(response);
    });
    fetchMealRecomendation().then((data) => {
      setMeals(data);
    });
  }, []);

  function getMealsByArea(event) {
    if (event.target.value === 'All') {
      fetchMealRecomendation().then((data) => {
        setMeals(data);
      });
    } else {
      fetchMealsByArea(event.target.value).then((data) => {
        setMeals(data);
      });
    }
  }

  return (
    <div>
      <Header />
      <BottomMenu />
      <h3>Origem de comidas</h3>
      <select data-testid="explore-by-area-dropdown" onChange={ getMealsByArea }>
        <option value="All" data-testid="All-option">All</option>
        {options.map((option, index) => (
          <option
            data-testid={ `${option.strArea}-option` }
            value={ option.strArea }
            key={ index }
          >
            {option.strArea}
          </option>
        ))}
      </select>
      {meals.slice(0, Number('12')).map((meal, index) => (
        <Link to={ `/comidas/${meal.idMeal}` } key={ meal.idMeal }>
          <div data-testid={ `${index}-recipe-card` }>
            <h2 data-testid={ `${index}-card-name` }>{meal.strMeal}</h2>
            <img
              data-testid={ `${index}-card-img` }
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ExploreFoodsByOrigin;
