import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import recipesContext from '../context/recipesContext';
import { fetchFoods } from '../services/fetchAPI';

function PrincipalFoods() {
  const { recipes, setRecipes } = useContext(recipesContext);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetchFoods(null, 'a').then((response) => setFoods(response));
    console.log(foods);
  }, []);

  const cardLimit = 12;
  const foodsMap = Object.values(foods)[0];
  console.log(foodsMap);
  return (
    <>
      <Header title="Comidas" />
      {foodsMap && foodsMap.map((recipe, index) => {
        if (index < cardLimit) {
          return (
            <div key={ recipe.idMeal } data-testid={ `${index}-recipe-card` }>
              <img
                src={ recipe.strMealThumb }
                alt="recipe"
                data-testid={ `${index}-card-img` }
              />
              <h3 data-testid={ `${index}-card-name` }>{ recipe.strMeal }</h3>
            </div>

          );
        }
        return 'food';
      })}
      <Footer />
    </>
  );
}
export default PrincipalFoods;
