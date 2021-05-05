import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard';
import { getRecipesByName } from '../services/api';

export default function RecomendationList({ isMeal }) {
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    async function getRecipes() {
      const request = await getRecipesByName('', isMeal);
      setRecipes(request);
    }
    getRecipes();
  }, [isMeal]);

  return (
    <section>
      {recipes && recipes.slice(0, Number('6')).map((item, index) => (
        <div key={ index } data-testid={ `${index}-recomendation-card` }>
          <RecipeCard
            index={ index }
            thumbUrl={ isMeal ? item.strMealThumb : item.strDrinkThumb }
            name={ isMeal ? item.strMeal : item.strDrink }
            redirectUrl={ isMeal
              ? `/comidas/${item.idMeal}`
              : `/bebidas/${item.idDrink}` }
          />
        </div>
      ))}
    </section>
  );
}

RecomendationList.propTypes = {
  isMeal: PropTypes.bool.isRequired,
};
