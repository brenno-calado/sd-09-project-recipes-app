import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { randomFoodAPI } from '../services/fetchFoodsAPI';

const ExploreButtonsFoods = () => {
  const [myMeal, setMyMeal] = useState([]);

  useEffect(() => {
    randomFoodAPI()
      .then((meal) => {
        setMyMeal(meal);
      });
    console.log(myMeal);
  }, []);

  return (
    <div>
      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>

      <Link to="/explorar/comidas/area">
        <button
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>
      </Link>

      <Link to={ `/comidas/${myMeal.idMeal}` }>
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </Link>
    </div>
  );
};

export default ExploreButtonsFoods;
