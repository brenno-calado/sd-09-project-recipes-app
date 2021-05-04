import React, { useEffect, useState } from 'react';
import { fetchListAllIngredientsFoods } from '../../service/mealAPI';
import { fetchListAllIngredientsDriks } from '../../service/cocktailAPI';

function ExploreIngredients({ path }) {
  const [ingredients, setIngredients] = useState([]);
  const AMOUNT_OF_VISIBLE_INGREDIENTS = 12;

  const ingredientsFood = '/explorar/comidas/ingredientes';
  const ingredientsDrinks = '/explorar/bebidas/ingredientes';

  useEffect(() => {
    const fetch = async () => {
      if (path === ingredientsFood) {
        const response = await fetchListAllIngredientsFoods();
        setIngredients(response.meals);
      }
      if (path === ingredientsDrinks) {
        const response = await fetchListAllIngredientsDriks();
        setIngredients(response.drinks);
      }
    };
    fetch();
  }, [path]);

  const renderIngredients = () => ingredients.slice(0, AMOUNT_OF_VISIBLE_INGREDIENTS)
    .map((element, index) => (
      <section key={ index } data-testid={ `${index}-ingredient-card` }>
        <img
          data-testid={ `${index}-card-img` }
          src={
            path === ingredientsFood
              ? `https://www.themealdb.com/images/ingredients/${element.strIngredient}-Small.png`
              : `https://www.thecocktaildb.com/images/ingredients/${element.strIngredient1}-Small.png`
          }
          alt={
            path === ingredientsFood
              ? element.strIngredient
              : element.strIngredient1
          }
        />
        <p
          data-testid={ `${index}-card-name` }
        >
          {
            path === ingredientsFood
              ? element.strIngredient
              : element.strIngredient1
          }
        </p>
      </section>
    ));
  return (
    renderIngredients()
  );
}

export default ExploreIngredients;
