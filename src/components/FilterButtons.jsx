import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  requestMealCategoryList, requestDrinkCategoryList, searchRecipe } from '../actions';

const FIVE = 5;

const FilterButtons = ({
  drinks, meals, requestDrinks, requestMeals, dispatchFilter }) => {
  const page = useLocation().pathname;
  useEffect(() => {
    requestDrinks();
    requestMeals();
  }, [requestDrinks, requestMeals]);

  const handleClick = async ({ target: { value } }) => {
    let mealOrDrink = '';
    if (page === '/bebidas') mealOrDrink = 'drink';
    if (page === '/comidas') mealOrDrink = 'meal';
    dispatchFilter(mealOrDrink, value, mealOrDrink);
  };

  const renderCategoriesButtons = () => {
    let mealOrDrink = '';
    if (page === '/comidas') mealOrDrink = meals;
    if (page === '/bebidas') mealOrDrink = drinks;
    return mealOrDrink.map(({ strCategory }, index) => (
      index < FIVE && (
        <button
          key={ strCategory }
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          value={ strCategory }
          onClick={ handleClick }
        >
          {strCategory}
        </button>
      )
    ));
  };

  return (
    <>
      {renderCategoriesButtons()}
    </>
  );
};

const mapStateToProps = (state) => ({
  drinks: state.drinkCategoriesList.categories,
  meals: state.mealCategoriesList.categories,
});

const mapDispatchToProps = (dispatch) => ({
  requestDrinks: () => dispatch(requestDrinkCategoryList()),
  requestMeals: () => dispatch(requestMealCategoryList()),
  dispatchFilter: (type, text, category) => (
    dispatch(searchRecipe(type, text, category))
  ),
});

FilterButtons.propTypes = {
  requestDrinks: PropTypes.func,
  requestMeals: PropTypes.func,
  drinks: PropTypes.arrayOf(Object),
  meals: PropTypes.arrayOf(Object),
  dispatchFilter: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(FilterButtons);
