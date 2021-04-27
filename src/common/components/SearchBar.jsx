import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchMealIngredientAPI, fetchMealLetterAPI,
  fetchMealNameAPI } from '../../services/fetchMealAPI';
import { saveMeals } from '../../actions/userActions';

const SearchBar = (props) => {
  const [filter, setFilter] = useState('');
  const [inputText, setInputText] = useState('');

  const handleClick = (e) => {
    const { target } = e;
    setFilter(target.value);
  };

  const handleChange = (e) => {
    const { target } = e;
    setInputText(target.value);
  };

  const displayAlert = () => {
    alert('Sua busca deve conter somente 1 (um) caracter');
  };

  const handleSearch = async () => {
    const { dispatchMeals } = props;
    let meals = [];
    if (filter === 'firstLetter' && inputText.length > 1) {
      return displayAlert();
    }
    if (filter === 'ingredient') {
      meals = await fetchMealIngredientAPI(inputText);
    }
    if (filter === 'name') {
      meals = await fetchMealNameAPI(inputText);
    }
    if (filter === 'firstLetter') {
      meals = await fetchMealLetterAPI(inputText);
    }
    dispatchMeals(meals);
  };

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

const mapDispatchToProps = (dispatch) => ({
  dispatchMeals: (meals) => dispatch(saveMeals(meals)),
});

SearchBar.propTypes = {
  dispatchMeals: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SearchBar);
