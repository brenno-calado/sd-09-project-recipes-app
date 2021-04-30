import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchFoods } from '../services/fetchAPI';
import RecipeCategory from '../components/RecipeCategory';

function PrincipalFoods() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetchFoods(null, 'a').then((response) => setFoods(response));
  }, []);

  const cardLimit = 12;
  const foodsMap = Object.values(foods)[0];
  return (
    <>
      <Header title="Comidas" />
      <RecipeCategory type="meals" />
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
