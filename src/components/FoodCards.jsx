import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getMealsByName } from '../services/MealFetch';
import MealContext from '../context/MealContext';

function FoodCards() {
  const { foods, setFoods, redirect, setRedirect } = useContext(MealContext);
  const cardsLimit = 12;

  useEffect(() => {
    if (redirect) {
      setRedirect(false);
    } else {
      getMealsByName('').then((response) => setFoods(response));
    }
  }, []);

  return (
    <>
      {foods.slice(0, cardsLimit).map((food, index) => (
        <div key={ Math.random() }>
          <Link
            to={ `/comidas/${food.idMeal}` }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ food.strMealThumb }
              alt={ `Imagem do prato ${food.idMeal}` }
              data-testid={ `${index}-card-img` }
              style={ { width: '150px' } }
            />
          </Link>
          <h4 data-testid={ `${index}-card-name` }>{ food.strMeal }</h4>
        </div>
      ))}
    </>
  );
}

export default FoodCards;
