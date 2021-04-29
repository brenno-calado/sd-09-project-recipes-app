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
}) {
  const [previousCategory, setPreviousCategory] = useState('');

  const fetchByCategory = () => {
    if (recipeType === 'meals') {
      mealsCategoryDispatcher();
    }
    if (recipeType === 'cocktails') {
      cocktailsCategoryDispatcher();
    }
  };

  useEffect(() => {
    if (!isFetchedCategories) {
      fetchByCategory();
    }
  }, [isFetched]);

  const handleClick = ({ target: { value } }) => {
    if ((previousCategory === value) || (value === 'all')) {
      if (recipeType === 'meals') mealsThunkDispatcher('', '');
      if (recipeType === 'cocktails') cocktailsThunkDispatcher('', '');
    } else {
      if (recipeType === 'meals') {
        fetchMealsByCategory(value);
      }
      if (recipeType === 'cocktails') {
        fetchCocktailsByCategory(value);
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
              { strCategory}
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
  recipeType: state.loginReducer.recipeType,
  categories: state.loginReducer.categories,
  isFetchingCategories: state.loginReducer.isFetchingCategories,
  isFetchedCategories: state.loginReducer.isFetchedCategories,
  isFetched: state.loginReducer.isFetched,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFilter);
