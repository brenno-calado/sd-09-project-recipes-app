import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mealsThunk, cocktailsThunk } from '../redux/actions';

const SearchBar = ({
  pathname,
  mealsThunkDispatcher,
  cocktailsThunkDispatcher,
}) => {
  const [textSearch, setTextSearch] = useState('');
  const [radioSearch, setRadioSearch] = useState();

  const handleClick = () => {
    if (radioSearch === 'first-letter-search' && textSearch.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      if (pathname === '/comidas') {
        mealsThunkDispatcher(radioSearch, textSearch);
      }
      if (pathname === '/bebidas') {
        cocktailsThunkDispatcher(radioSearch, textSearch);
      }
    }
  };

  return (
    <div>
      <label htmlFor="search">
        Search
        <input
          type="text"
          data-testid="search-input"
          name="search"
          id="search"
          value={ textSearch }
          onChange={ ({ target: { value } }) => setTextSearch(value) }
        />
      </label>

      <label htmlFor="ingredient-search">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingredient-search"
          name="radio-filter"
          onClick={ ({ target: { id } }) => setRadioSearch(id) }
        />
        Ingrediente
      </label>

      <label htmlFor="name-search">
        <input
          type="radio"
          data-testid="name-search-radio"
          id="name-search"
          name="radio-filter"
          onClick={ ({ target: { id } }) => setRadioSearch(id) }
        />
        Nome
      </label>

      <label htmlFor="first-letter-search">
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          id="first-letter-search"
          name="radio-filter"
          onClick={ ({ target: { id } }) => setRadioSearch(id) }
        />
        Primeira letra
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Buscar
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  pathname: state.recipesReducer.pathname,
});

const mapDispatchToProps = (dispatch) => ({
  mealsThunkDispatcher:
    (radioSearch, textSearch) => dispatch(mealsThunk(radioSearch, textSearch)),
  cocktailsThunkDispatcher:
    (radioSearch, textSearch) => dispatch(cocktailsThunk(radioSearch, textSearch)),
});

SearchBar.propTypes = {
  pathname: PropTypes.string.isRequired,
  mealsThunkDispatcher: PropTypes.func.isRequired,
  cocktailsThunkDispatcher: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
