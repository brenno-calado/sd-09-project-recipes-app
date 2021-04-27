import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ExploreButtonsFoods = () => {
  const [myMeal, setMyMeal] = useState([]);

  const loadRandomMeal = async () => {
    const myRandomMeal = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then((meal) => meal.meals[0]);
    setMyMeal(myRandomMeal);
  };

  useEffect(() => {
    loadRandomMeal();
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
