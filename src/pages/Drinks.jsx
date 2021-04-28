import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';

function Drinks({ match }) {
  const [result, setResult] = useState(undefined);
  const renderResult = () => {
    if (result === undefined) return null;
    if (result.drinks.length === 1) {
      return <Redirect to={ `${match.path}/${result.drinks[0].idDrinks}` } />;
    }
    return result.drinks
      .map((drink) => <RecipeCard key={ drink.idDrink } drink={ drink } />);
  };

  return (
    <div>
      <button type="button" data-testid="search-top-btn">click</button>
      {SearchBar(match, setResult)}
      <section>{ renderResult() }</section>
    </div>
  );
}

Drinks.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default Drinks;
