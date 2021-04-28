import React, { useState, useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import { fetchMealIngredientAPI, fetchMealLetterAPI,
  fetchMealNameAPI } from '../../services/fetchMealAPI';
import { fetchDrinkIngredientAPI, fetchDrinkLetterAPI,
  fetchDrinkNameAPI } from '../../services/fetchDrinkAPI';
import { saveMeals, saveDrinks } from '../../actions/userActions';

const SearchBar = (props) => {
  const {
    inputText,
    filter,
    handleClick,
    handleChange,
    displayAlert,
    verifyMealsQuantity,
    verifyDrinksQuantity,
    shouldRedirect,
    setShouldRedirect,
    // handleSearch,
    itShouldRedirect,
  } = useContext(RecipesContext);

  const { meals, drinks } = props;

  // verifyMealsQuantity(meals);
  // verifyDrinksQuantity(drinks);
  // itShouldRedirect(drinks, meals);

  useEffect(() => {
    if (shouldRedirect.meals) {
      const { idMeal } = meals[0];
      // setShouldRedirect({ meals: false });
      window.location.replace(`/comidas/${idMeal}`);
    }
    if (shouldRedirect.drinks) {
      const { idDrink } = drinks[0];
      // setShouldRedirect({ drinks: false });
      console.log(idDrink);
      window.location.replace(`/bebidas/${idDrink}`);
    }
  }, [meals, drinks, shouldRedirect]);

  const filterMeals = async () => {
    const { dispatchMeals } = props;
    let comidas = [];
    if (filter === 'firstLetter' && inputText.length > 1) {
      displayAlert();
    } else if (filter === 'ingredient') {
      comidas = await fetchMealIngredientAPI(inputText);
    } else if (filter === 'name') {
      comidas = await fetchMealNameAPI(inputText);
    } else if (filter === 'firstLetter') {
      comidas = await fetchMealLetterAPI(inputText);
    }
    if (comidas) {
      const { meals: rango } = comidas;
      if (!rango) {
        return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
    }
    dispatchMeals(comidas.meals);
    verifyMealsQuantity(meals);
    // if (shouldRedirect.meals) {
    //   const { idMeal } = meals[0];
    //   // setShouldRedirect({ meals: false });
    //   return <Redirect to={ `/comidas/${idMeal}` } />;
    //   // window.location.replace(`/comidas/${idMeal}`);
    // }
  };

  const filterDrinks = async () => {
    const { dispatchDrinks } = props;
    let bebidas = [];
    if (filter === 'firstLetter' && inputText.length > 1) {
      displayAlert();
    } else if (filter === 'ingredient') {
      bebidas = await fetchDrinkIngredientAPI(inputText);
    } else if (filter === 'name') {
      bebidas = await fetchDrinkNameAPI(inputText);
    } else if (filter === 'firstLetter') {
      bebidas = await fetchDrinkLetterAPI(inputText);
    }
    if (bebidas) {
      const { drinks: golo } = bebidas;
      if (!golo) {
        return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
    }
    dispatchDrinks(bebidas.drinks);
    verifyDrinksQuantity(drinks);
    // if (shouldRedirect.drinks) {
    //   const { idDrink } = drinks[0];
    //   // setShouldRedirect({ drinks: false });
    //   console.log(idDrink);
    //   window.location.replace(`/bebidas/${idDrink}`);
    // }
  };

  const handleSearch = () => {
    const { value } = props;
    console.log(value);
    switch (value) {
    case 'comidas':
      return filterMeals();
    case 'bebidas':
      return filterDrinks();
    default:
    }
  };

  // if (shouldRedirect.meals) {
  //   const { idMeal } = meals[0];
  //   // setShouldRedirect({ meals: false });
  //   return <Redirect to={ `/comidas/${idMeal}` } />;
  //   // window.location.replace(`/comidas/${idMeal}`);
  // }

  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        onChange={ handleChange }
      />
      <div>
        <label htmlFor="ingredient-input">
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            name="search-radio"
            id="ingredient-input"
            value="ingredient"
            onClick={ handleClick }
          />
          Ingrediente
        </label>
        <label htmlFor="name-search-input">
          <input
            data-testid="name-search-radio"
            type="radio"
            name="search-radio"
            id="name-search-input"
            value="name"
            onClick={ handleClick }
          />
          Nome
        </label>
        <label htmlFor="first-letter-input">
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            name="search-radio"
            id="first-letter-input"
            value="firstLetter"
            onClick={ handleClick }
          />
          Primeira letra
        </label>
      </div>
      <button
        data-testid="exec-search-btn"
        type="button"
        id="search-btn"
        onClick={ handleSearch }
      >
        Buscar
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  meals: state.searchReducer.meals,
  drinks: state.searchReducer.drinks,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchMeals: (meals) => dispatch(saveMeals(meals)),
  dispatchDrinks: (drinks) => dispatch(saveDrinks(drinks)),
});

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  dispatchMeals: PropTypes.func.isRequired,
  dispatchDrinks: PropTypes.func.isRequired,
  meals: PropTypes.arrayOf({}).isRequired,
  drinks: PropTypes.arrayOf({}).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
