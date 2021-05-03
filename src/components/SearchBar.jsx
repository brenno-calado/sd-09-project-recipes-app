import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { mealsThunk, cocktailsThunk } from '../redux/actions';

const SearchBar = ({
  pathname,
  mealsThunkDispatcher,
  cocktailsThunkDispatcher,
  data,
  isFetched,
}) => {
  const [textSearch, setTextSearch] = useState('');
  const [radioSearch, setRadioSearch] = useState();
  const [redirect, setRedirect] = useState(false);
  const [redirectPath, setRedirectPath] = useState('');

  const verifyPath = useCallback(() => {
    if (pathname === '/comidas') {
      setRedirectPath(`/comidas/${data[0].idMeal}`);
      setRedirect(true);
    }
    if (pathname === '/bebidas') {
      setRedirectPath(`/bebidas/${data[0].idDrink}`);
      setRedirect(true);
    }
  }, [data, pathname]);

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

  useEffect(() => {
    if (data.length === 1) {
      verifyPath();
    }
    if (isFetched && data.length === 0) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [data, isFetched, verifyPath]);

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
  pathname: state.recipesReducer.pathname,
  data: state.recipesReducer.data,
  isFetched: state.recipesReducer.isFetched,
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
  isFetched: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
