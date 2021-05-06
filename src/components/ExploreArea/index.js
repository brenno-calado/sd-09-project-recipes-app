import React, { useEffect, useState } from 'react';
import {
  fetchMealsByAreaFood,
  fetchAreaCountryFood,
  fetchAllMeals,
} from '../../service/mealAPI';
import RecipeCard from '../RecipeCard';

function ExploreArea() {
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [country, setCountry] = useState('American');
  const [foodCountry, setFoodCountry] = useState([]);
  const AMOUNT_OF_VISIBLE_RECIPES = 12;

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchMealsByAreaFood();
      setSelectedCountry(response.meals);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (country !== 'All') {
      const fetch = async () => {
        const response = await fetchAreaCountryFood(country);
        setFoodCountry(response.meals);
      };
      fetch();
    } else {
      const fetch = async () => {
        const allMealsAPI = await fetchAllMeals();
        setFoodCountry(allMealsAPI.meals);
      };
      fetch();
    }
  }, [country]);

  const handleClick = ({ target: { value } }) => {
    setCountry(value);
  };

  const renderIngredientsArea = () => (
    <>
      <select
        value={ country }
        onChange={ handleClick }
        data-testid="explore-by-area-dropdown"
      >
        <option data-testid="All-option">All</option>
        {selectedCountry.map((element, index) => (
          <option
            key={ index }
            data-testid={ `${element.strArea}-option` }
          >
            {element.strArea}
          </option>
        ))}
      </select>
      <>
        {foodCountry.slice(0, AMOUNT_OF_VISIBLE_RECIPES)
          .map((element, index) => (
            <RecipeCard
              index={ index }
              name={ element.strMeal }
              image={ element.strMealThumb }
              path="/comidas"
              id={ element.idMeal }
              key={ index }
            />
          ))}
      </>
    </>
  );
  return (
    renderIngredientsArea()
  );
}

export default ExploreArea;
