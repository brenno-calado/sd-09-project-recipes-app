import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';

function Food({ match }) {
  const [result, setResult] = useState(undefined);
  const renderResult = () => {
    if (result === undefined) return null;
    if (result.meals.length === 1) {
      return <Redirect to={ `${match.path}/${result.meals[0].idMeal}` } />;
    }
    return result.meals.map((meal) => <RecipeCard key={ meal.idMeal } meal={ meal } />);
  };

  return (
    <div>
      <button type="button" data-testid="search-top-btn">click</button>
      {SearchBar(match, setResult)}
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
