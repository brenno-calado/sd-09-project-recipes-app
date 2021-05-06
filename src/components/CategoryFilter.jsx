import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  cocktailsCategoriesThunk,
  mealsCategoriesThunk,
  mealsByCategoriesThunk,
  cocktailsByCategoriesThunk,
  mealsThunk,
  cocktailsThunk,
  setCurrentCategory,
} from '../redux/actions';

function CategoryFilter({
  recipeType,
  categories,
  mealsCategoryDispatcher,
  cocktailsCategoryDispatcher,
  fetchMealsByCategory,
  fetchCocktailsByCategory,
  isFetchedCategories,
  isFetched,
  mealsThunkDispatcher,
  cocktailsThunkDispatcher,
  currentCategoryDispatcher,
}) {
  const [previousCategory, setPreviousCategory] = useState('');

  const fetchCategories = () => {
    if (recipeType === 'comidas') {
      mealsCategoryDispatcher();
    }
    if (recipeType === 'bebidas') {
      cocktailsCategoryDispatcher();
    }
  };

  useEffect(() => {
    if (!isFetchedCategories) {
      fetchCategories();
    }
  }, [isFetched]);

  const handleClick = ({ target: { value } }) => {
    if ((previousCategory === value) || (value === 'all')) {
      if (recipeType === 'comidas') mealsThunkDispatcher('', '');
      if (recipeType === 'bebidas') cocktailsThunkDispatcher('', '');
      currentCategoryDispatcher('');
    } else {
      if (recipeType === 'comidas') {
        fetchMealsByCategory(value);
        currentCategoryDispatcher(value);
      }
      if (recipeType === 'bebidas') {
        fetchCocktailsByCategory(value);
        currentCategoryDispatcher(value);
      }
    }
    setPreviousCategory(value);
  };

  return (
    <section>
      {
        isFetchedCategories && (
          categories.map(({ strCategory }) => (
            <button
              key={ strCategory }
              type="button"
              data-testid={ `${strCategory}-category-filter` }
              onClick={ handleClick }
              value={ strCategory }
            >
              { strCategory }
            </button>
          ))
        )
      }
      {
        isFetchedCategories
        && (
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ handleClick }
            value="all"
          >
            All
          </button>
        )
      }
    </section>
  );
}

const mapStateToProps = (state) => ({
  recipeType: state.recipesReducer.recipeType,
  categories: state.recipesReducer.categories,
  isFetchingCategories: state.recipesReducer.isFetchingCategories,
  isFetchedCategories: state.recipesReducer.isFetchedCategories,
  isFetched: state.recipesReducer.isFetched,
});

const mapDispatchToProps = (dispatch) => ({
  mealsCategoryDispatcher: () => dispatch(mealsCategoriesThunk()),
  cocktailsCategoryDispatcher: () => dispatch(cocktailsCategoriesThunk()),
  fetchMealsByCategory: (category) => dispatch(mealsByCategoriesThunk(category)),
  fetchCocktailsByCategory: (category) => dispatch(cocktailsByCategoriesThunk(category)),
  mealsThunkDispatcher:
    (radioSearch, textSearch) => dispatch(mealsThunk(radioSearch, textSearch)),
  cocktailsThunkDispatcher:
    (radioSearch, textSearch) => dispatch(cocktailsThunk(radioSearch, textSearch)),
  currentCategoryDispatcher: (category) => dispatch(setCurrentCategory(category)),
});

CategoryFilter.propTypes = {
  recipeType: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  mealsCategoryDispatcher: PropTypes.func.isRequired,
  cocktailsCategoryDispatcher: PropTypes.func.isRequired,
  mealsThunkDispatcher: PropTypes.func.isRequired,
  cocktailsThunkDispatcher: PropTypes.func.isRequired,
  fetchMealsByCategory: PropTypes.func.isRequired,
  fetchCocktailsByCategory: PropTypes.func.isRequired,
  isFetchedCategories: PropTypes.bool.isRequired,
  isFetched: PropTypes.bool.isRequired,
  currentCategoryDispatcher: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFilter);
