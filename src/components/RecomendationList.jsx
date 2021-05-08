import { string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getDefaultRecipes } from '../services/apiServices';
import RecipeCard from './RecipeCard';
import './RecomendationList.css';

const RecomendationList = ({ type }) => {
  const [recipes, setRecipes] = useState();
  const [recomendationType] = useState(() => {
    if (type === 'drinks') return ['meals', 'comida', 'Meal'];
    if (type === 'meals') return ['drinks', 'bebida', 'Drink'];
  });

  useEffect(() => {
    const maxIndex = 5;
    getDefaultRecipes(recomendationType[0]).then((data) => setRecipes(data
      .filter((__, index) => index <= maxIndex)));
  }, [recomendationType]);
  return (
    <div className="recomendation-list">
      {recipes && recipes
        .map((recipe, index) => (
          <RecipeCard
            testid={ `${index}-recomendation-card` }
            key={ recipe[`str${recomendationType[2]}`] }
            img={ recipe[`str${recomendationType[2]}Thumb`] }
            title={ recipe[`str${recomendationType[2]}`] }
            index={ index }
          />
        ))}
    </div>
  );
};

RecomendationList.propTypes = {
  type: string,
}.isRequired;

export default RecomendationList;
