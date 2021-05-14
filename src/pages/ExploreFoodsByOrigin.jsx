import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import { fetchAreas, fetchMealsByArea,
  fetchMealRecomendation } from '../services/MealApi';
import '../styles/pages/ExploreByOrigin.css';

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
    <>
      <Header />
      <div className="explore-origin-container">
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ getMealsByArea }
          className=""
        >
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
        <div className="explore-origin-cards-container">
          {meals.slice(0, Number('12')).map((meal, index) => (
            <Link to={ `/comidas/${meal.idMeal}` } key={ meal.idMeal }>
              <div
                data-testid={ `${index}-recipe-card` }
                className="origin-card"
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                />
                <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <BottomMenu />
    </>
  );
}

export default ExploreFoodsByOrigin;
