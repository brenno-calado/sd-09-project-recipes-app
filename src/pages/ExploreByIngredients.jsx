import React, { useEffect, useState } from 'react';
import IngredientCard from '../components/IngredientCard';

const ExploreByIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const maxIndex = 12;
  const [type] = useState(() => {
    if (window.location.href.includes('bebidas')) return 'bebidas';
    if (window.location.href.includes('comidas')) return 'comidas';
  });
  useEffect(() => {
    if (type === 'comidas') {
      fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
        .then((response) => response.json()
          .then((data) => setIngredients(data.meals
            .filter((__, index) => index < maxIndex))));
    } else {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
        .then((response) => response.json()
          .then((data) => setIngredients(data.drinks
            .filter((__, index) => index < maxIndex))));
    }
  }, [type]);

  return (
    <div>
      { ingredients.length && ingredients.map((ingredient, index) => (
        <IngredientCard
          ingredient={ ingredient }
          index={ index }
          type={ type }
          key={ index }
        />
      )) }
    </div>
  );
};

export default ExploreByIngredients;
