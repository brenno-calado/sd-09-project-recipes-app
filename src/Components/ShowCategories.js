import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchMealCategories, fetchCocktailsCategories } from '../services/ApiRequest';
import '../Styles/CategoryBtn.css';

function ShowCategories({ name, searchResult }) {
  const [categories, setCategories] = useState([]);
  const getCategories = useCallback(async (apiRequest) => {
    const getmealsCategory = await apiRequest();
    if (name === 'Comidas') setCategories(getmealsCategory.meals);
    else setCategories(getmealsCategory.drinks);
  }, [name]);

  useEffect(() => {
    if (name === 'Comidas') getCategories(fetchMealCategories);
    else getCategories(fetchCocktailsCategories);
  }, [getCategories, name]);

  const numberOfCategories = 5;
  return (
    <div className="categoryBtnsContainer">
      {!categories
        ? <div />
        : categories.map(
          (category, index) => (index < numberOfCategories
            && (
              <button
                className="categoryBtn"
                type="button"
                data-testid={ `${category.strCategory}-category-filter` }
                key={ category.strCategory }
                onClick={ () => searchResult(category.strCategory) }
              >
                {category.strCategory}
              </button>)
          ),
        )}
      <button
        className="btnAll"
        data-testid="All-category-filter"
        key="All"
        onClick={ () => searchResult('All') }
        type="button"
      >
        All
      </button>
    </div>
  );
}

ShowCategories.propTypes = {
  name: PropTypes.string.isRequired,
  searchResult: PropTypes.func.isRequired,
};

export default ShowCategories;
