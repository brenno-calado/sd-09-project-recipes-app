import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';
import { fetchAllDrinks, fetchCategoryDrinks } from '../service/cocktailAPI';
import useResult from '../effects/useResult';
import useCategory from '../effects/useCategory';
import CategoryButton from '../components/CategoryButton';

function Drinks({ match: { path } }) {
  const [result, setResult] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState([]);
  const maxResult = 12;

  useCategory(fetchCategoryDrinks, setCategories);
  useResult(fetchAllDrinks, setResult);

  const renderCategories = () => {
    if (categories.length === 0) return;
    const maxCategories = 5;
    return categories.drinks.slice(0, maxCategories)
      .map(({ strCategory }) => (
        <CategoryButton
          key={ strCategory }
          strCategory={ strCategory }
          setFilter={ setFilter }
          path={ path }
        />));
  };

  const renderRecipeCards = (data) => data.drinks.slice(0, maxResult)
    .map((drink, index) => (
      <RecipeCard
        index={ index }
        key={ drink.idDrink }
        name={ drink.strDrink }
        image={ drink.strDrinkThumb }
      />
    ));

  const renderFilter = () => {
    if (filter.drinks === undefined) return 'loading...';
    return renderRecipeCards(filter);
  };

  const renderResult = () => {
    if (result.length === 0) return '...loading';
    if (result.drinks === null) {
      return window
        .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (result.drinks.length === 1) {
      return <Redirect to={ `${path}/${result.drinks[0].idDrink}` } />;
    }

    return renderRecipeCards(result);
  };

  return (
    <div className="center">
      <Header title="Bebidas" path={ path } setResult={ setResult } />
      <section className="categories-container">{ renderCategories() }</section>
      <section
        className="card-container"
      >
        { filter.length === 0 ? renderResult() : renderFilter() }
      </section>
    </div>
  );
}

Drinks.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default Drinks;
