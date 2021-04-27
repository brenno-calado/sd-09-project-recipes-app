import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mealsThunk, cocktailsThunk } from '../redux/actions';
import { Redirect } from 'react-router';

const SearchBar = ({
  pathname, mealsThunkDispatcher, cocktailsThunkDispatcher, data,
}) => {
  const [textSearch, setTextSearch] = useState('');
  const [radioSearch, setRadioSearch] = useState();
  const [redirect, setRedirect] = useState(false);
  const [redirectPath, setRedirectPath] = useState('');

  const handleClick = () => {
    if (pathname === '/comidas') {
      mealsThunkDispatcher(radioSearch, textSearch);
    }
    if (pathname === '/bebidas') {
      cocktailsThunkDispatcher(radioSearch, textSearch);
    }
  };

  const verifyPath = () => {
    if (pathname === '/comidas') {
      setRedirectPath(`/bebidas/${data[0].idMeal}`);
      setRedirect(true);
    }
    if (pathname === '/bebidas') {
      setRedirectPath(`/bebidas/${data[0].idDrink}`);
      setRedirect(true);
    }
  };

  useEffect(() => {
    if (data.length === 1) {
      verifyPath();
    }
  }, [data]);

  return (
    <div>
      { redirect && <Redirect to={ redirectPath } /> }
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
  pathname: state.loginReducer.pathname,
  data: state.loginReducer.data,
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
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
