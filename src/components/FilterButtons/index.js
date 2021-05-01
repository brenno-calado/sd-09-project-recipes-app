import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import RecipesContext from '../../context/RecipesContext';

const FilterButtons = () => {
  const {
    categories,
    category,
    setCategory,
    cleanCategories } = useContext(RecipesContext);

  const handleFilter = (filterName) => (
    category !== filterName ? setCategory(filterName) : cleanCategories()
  );

  return categories.isFetching ? (
    <div>
      <Button block disabled>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </Button>
      <Button block disabled>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </Button>
      <Button block disabled>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </Button>
      <Button block disabled>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </Button>
      <Button block disabled>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </Button>
    </div>
  ) : (
    <div className="filter-buttons-container">
      <Button
        block
        data-testid="All-category-filter"
        onClick={ cleanCategories }
      >
        All
      </Button>
      { categories.categoriesList.map(({ strCategory }) => (
        <Button
          block
          key={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ () => handleFilter(strCategory) }
        >
          {strCategory}
        </Button>
      )) }
    </div>
  );
};

FilterButtons.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default FilterButtons;
