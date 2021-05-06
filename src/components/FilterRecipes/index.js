import React from 'react';
import { func } from 'prop-types';

const FilterRecipes = (props) => {
  const { filterButton } = props;

  return (
    <div>
      <button
        name="All"
        type="button"
        data-testid="filter-by-all-btn"
        className="btn btn-outline-secondary"
        onClick={ (e) => filterButton(e) }
      >
        All
      </button>
      <button
        name="comida"
        type="button"
        data-testid="filter-by-food-btn"
        className="btn btn-outline-secondary"
        onClick={ (e) => filterButton(e) }
      >
        comida
      </button>
      <button
        name="bebida"
        type="button"
        data-testid="filter-by-drink-btn"
        className="btn btn-outline-secondary"
        onClick={ (e) => filterButton(e) }
      >
        bebida
      </button>
    </div>
  );
};

FilterRecipes.propTypes = {
  filterButton: func,

}.isRequeired;

export default FilterRecipes;
