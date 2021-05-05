import React, { useEffect, useState } from 'react';
import { fetchMealsByAreaFood, fetchAreaCountryFood } from '../../service/mealAPI';

function ExploreIngredientsArea() {
  const [ingredients, setIngredients] = useState([]);
  const [country, setCountry] = useState('American');
  const [foodCountry, setFoodCountry] = useState([]);
  const AMOUNT_OF_VISIBLE_RECIPES = 12;

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchMealsByAreaFood();
      setIngredients(response.meals);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchAreaCountryFood(country);
      setFoodCountry(response.meals);
    };
    fetch();
  }, [country]);

  const handleClick = (event) => {
    setCountry(event.target.value);
  };

  const renderIngredientsArea = () => (
    <>
      <select onClick={ handleClick } data-testid="explore-by-area-dropdown">
        {ingredients.map((element, index) => (
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
            <section key={ index } data-testid={ `${index}-recipe-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ element.strMealThumb }
                alt={ element.strMeal }
              />
              <p data-testid={ `${index}-card-name` }>{element.strMeal}</p>
            </section>
          ))}
      </>
    </>
  );
  return (
    renderIngredientsArea()
  );
}

export default ExploreIngredientsArea;
