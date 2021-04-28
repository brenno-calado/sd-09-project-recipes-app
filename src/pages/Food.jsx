import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';

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
      <button type="button" data-testid="search-top-btn">click</button>
      {SearchBar(path, setResult)}
      <section>{ renderResult() }</section>
    </div>
  );
}

Food.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default Food;
