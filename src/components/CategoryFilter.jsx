import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cocktailsCategoriesThunk, mealsCategoriesThunk } from '../redux/actions';

function CategoryFilter({
  recipeType, categories, mealsCategoryDispatcher, cocktailsCategoryDispatcher
}) {
  useEffect(() => {
    if (recipeType === 'meals') {
      mealsCategoryDispatcher();
    }
    if (recipeType === 'cocktails') {
      cocktailsCategoryDispatcher();
    }
  }, [recipeType, mealsCategoryDispatcher, cocktailsCategoryDispatcher]);

  return (
    <section>
      {
        categories.map(({ strCategory }) => (
          <button
            key={ strCategory }
            type="button"
            data-testid={ `${strCategory}-category-filter` }
          >
            { strCategory }
          </button>
        ))
      }
    </section>
  );
}

const mapStateToProps = (state) => ({
  recipeType: state.loginReducer.recipeType,
  categories: state.loginReducer.categories,
  isFetchingCategories: state.loginReducer.isFetchingCategories,
});

const mapDispatchToProps = (dispatch) => ({
  mealsCategoryDispatcher: () => dispatch(mealsCategoriesThunk()),
  cocktailsCategoryDispatcher: () => dispatch(cocktailsCategoriesThunk()),
});

CategoryFilter.propTypes = {
  recipeType: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  mealsCategoryDispatcher: PropTypes.func.isRequired,
  cocktailsCategoryDispatcher: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFilter);
