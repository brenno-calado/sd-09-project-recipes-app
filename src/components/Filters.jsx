import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  fetchDrinksCategories,
  fetchMealsCategories,
} from '../services/fetchCategories';
import Filter from './Filter';
import { fetchRecipes } from '../services/fetchRecipes';
import { getRecipesAction } from '../Redux/actions';

function Filters({ type, setRecipes }) {
  const { pathname } = useLocation();
  const [filters, setFilters] = useState([]);
  const fetchFilters = type === 'Drinks' ? fetchDrinksCategories : fetchMealsCategories;

  useEffect(() => {
    const numberOfFilters = 5;
    fetchFilters().then((data) => setFilters(data.slice(0, numberOfFilters)));
  }, [fetchFilters]);

  const handleClick = () => {
    const endpoint = pathname === '/comidas'
      ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
      : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

    const typeOfList = pathname === '/comidas' ? 'meals' : 'drinks';

    fetchRecipes(endpoint, typeOfList).then((data) => setRecipes(data));
  };

  return (
    <div>
      <button type="button" onClick={ handleClick } data-testid="All-category-filter">
        All
      </button>
      {filters.map((filter, index) => (
        <Filter
          key={ index }
          filter={ filter }
          testId={ `${filter}-category-filter` }
          recipeType={ type }
        />
      ))}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setRecipes: (recipesList) => dispatch(getRecipesAction(recipesList)),
});

Filters.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default connect(null, mapDispatchToProps)(Filters);
