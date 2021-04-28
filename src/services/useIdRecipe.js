import { useEffect, useState } from 'react';

const useIdRecipe = () => {
  const [pageType, setPageType] = useState('');
  const [idRecipe, setIdRecipe] = useState('');

  useEffect(() => {
    if (pageType === 'comidas') {
      fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then((resp) => resp.json())
        .then((result) => setIdRecipe(result.meals[0].idMeal));
    } else if (pageType === 'bebidas') {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then((resp) => resp.json())
        .then((result) => setIdRecipe(result.drinks[0].idDrink));
    }
  }, [pageType]);

  return [idRecipe, setPageType];
};

export default useIdRecipe;
