import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  requestMealCategoryList, requestDrinkCategoryList, searchRecipe } from '../actions';

const FIVE = 5;

const FilterButtons = ({
  drinks, meals, requestDrinks, requestMeals, dispatchFilter }) => {
  const [toggle, setToggle] = useState({});
  const page = useLocation().pathname;
  useEffect(() => {
    requestDrinks();
    requestMeals();
  }, [requestDrinks, requestMeals]);

  const handleClick = async ({ target: { value, name } }) => {
    let mealOrDrink = '';
    if (page === '/bebidas') mealOrDrink = 'drink';
    if (page === '/comidas') mealOrDrink = 'meal';
    if (toggle[name] || name === 'All') {
      if (page === '/comidas') {
        dispatchFilter(null, null, 'meal');
        setToggle({ [name]: false });
      } else {
        dispatchFilter(null, null, 'cocktail');
        setToggle({ [name]: false });
      }
    } else {
      dispatchFilter(mealOrDrink, value, mealOrDrink);
      setToggle({
        [name]: true,
      });
    }
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
          name={ strCategory }
          onClick={ handleClick }
        >
          {strCategory}
        </button>
      )
    ));
  };

  const renderButtonAll = () => (
    <button
      type="button"
      data-testid="All-category-filter"
      value="All"
      name="All"
      onClick={ handleClick }
    >
      All
    </button>
  );

  return (
    <>
      {renderButtonAll()}
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
