import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';

function Drinks({ match: { path } }) {
  const [result, setResult] = useState(undefined);

  const renderResult = () => {
    if (!result) return undefined;
    if (!result.drinks) {
      return window
        .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (result.drinks.length === 1) {
      return <Redirect to={ `${path}/${result.drinks[0].idDrink}` } />;
    }
    const maxResult = 12;
    return result.drinks
      .map((drink, index) => (
        index >= maxResult ? null
          : (
            <RecipeCard
              index={ index }
              key={ drink.idDrink }
              name={ drink.strDrink }
              image={ drink.strDrinkThumb }
            />)
      ));
  };

  // useEffect(() => {
  //   renderResult();
  // }, [result]);

  return (
    <div>
      <button type="button" data-testid="search-top-btn">click</button>
      {SearchBar(path, setResult)}
      <section className="card-container">{ renderResult() }</section>
    </div>
  );
}

Drinks.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default Drinks;
