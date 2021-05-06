import React from 'react';

function index({ setFilters }) {
  return (
    <div className="container-btns-recipesDone">
      <button
        onClick={ () => setFilters('All') }
        className="btn-category"
        data-testid="filter-by-all-btn"
        type="button"
      >
        All
      </button>
      <button
        onClick={ () => setFilters('foods') }
        className="btn-category"
        data-testid="filter-by-food-btn"
        type="button"
      >
        Food
      </button>
      <button
        onClick={ () => setFilters('drinks') }
        className="btn-category"
        data-testid="filter-by-drink-btn"
        type="button"
      >
        Drinks
      </button>
    </div>
  );
}

export default index;
