import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  cocktailsCategoriesThunk,
  mealsCategoriesThunk,
  mealsByCategoriesThunk,
  cocktailsByCategoriesThunk,
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
}) {
  // const [teste, setTeste] = useState(false);

  const teste = () => {
    if (recipeType === 'meals') {
      mealsCategoryDispatcher();
    }
    if (recipeType === 'cocktails') {
      cocktailsCategoryDispatcher();
    }
  };

  useEffect(() => {
    console.log(isFetchedCategories);
    if (!isFetchedCategories) {
      console.log('entrou');
      teste();
    }
  }, [isFetched]);

  // useEffect(() => {  },[data]);

  const handleClick = ({ target: { value } }) => {
    if (recipeType === 'meals') {
      fetchMealsByCategory(value);
    }
    if (recipeType === 'cocktails') {
      fetchCocktailsByCategory(value);
    }
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
});

CategoryFilter.propTypes = {
  recipeType: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  mealsCategoryDispatcher: PropTypes.func.isRequired,
  cocktailsCategoryDispatcher: PropTypes.func.isRequired,
  fetchMealsByCategory: PropTypes.func.isRequired,
  fetchCocktailsByCategory: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFilter);
