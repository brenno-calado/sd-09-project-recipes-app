import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';

function Food({ match: { path } }) {
  const [result, setResult] = useState(undefined);

  const renderResult = () => {
    if (!result) return undefined;
    if (!result.meals) {
      return window
        .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (result.meals.length === 1) {
      return <Redirect to={ `${path}/${result.meals[0].idMeal}` } />;
    }
    const maxResult = 12;
    return result.meals
      .map((meal, index) => (
        index >= maxResult ? null
          : (
            <RecipeCard
              index={ index }
              key={ meal.idMeal }
              name={ meal.strMeal }
              image={ meal.strMealThumb }
            />)
      ));
  };

  return (
    <div>
      <Header title="Comidas" path={ path } setResult={ setResult } />
      <section className="card-container">{ renderResult() }</section>
    </div>
  );
}

Food.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default Food;
