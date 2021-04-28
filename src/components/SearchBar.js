import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
import { AppContext } from '../context/AppContext';
import { getDrinkResults, getFoodResults } from '../services';

const SearchBar = ({ title }) => {
  const baseSearchBar = {
    searchInput: '',
    radioOn: '',
  };

  const [searchState, setSearchState] = useState(baseSearchBar);
  const [showAlertLetterRadio, setShowAlertLetter] = useState(false);
  const [noResultsApi, setNoResults] = useState(1);
  // const [pathToGo, setPath] = useState(null);
  const { setFoodApiResults,
    setDrinksApiResults } = useContext(AppContext);

  const handleClick = async () => {
    const { searchInput, radioOn } = searchState;
    let results;
    const shouldAlert = searchInput.length > 1 && radioOn === 'firstLetterRadio';
    if (shouldAlert) setShowAlertLetter(true); else setShowAlertLetter(false);
    if (title === 'Comidas' && !shouldAlert) {
      results = await getFoodResults(radioOn, searchInput);
      setFoodApiResults(results);
      setNoResults(results);
    }
    if (title === 'Bebidas' && !shouldAlert) {
      results = await getDrinkResults(radioOn, searchInput);
      setDrinksApiResults(results);
      setNoResults(results);
    }
  };

  const handleChange = ({ target: { value, name } }) => {
    if (name === 'searchInput') setSearchState({ ...searchState, searchInput: value });
  };

  const handleRadio = ({ target: { value } }) => {
    setSearchState({ ...searchState, radioOn: value });
  };
  const { searchInput, radioOn } = searchState;

  // if (pathToGo !== null) return <Redirect to={ pathToGo } />;
  return (
    <form>
      <input
        placeholder="Buscar receita"
        data-testid="search-input"
        name="searchInput"
        value={ searchInput }
        onChange={ handleChange }
      />
      <div onChange={ handleRadio }>
        <label htmlFor="ingredientRadio">
          Ingrediente
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            id="ingredientRadio"
            value="ingredientRadio"
            checked={ radioOn === 'ingredientRadio' }
          />
        </label>
        <label htmlFor="nameRadio">
          Nome
          <input
            data-testid="name-search-radio"
            type="radio"
            id="nameRadio"
            value="nameRadio"
            checked={ radioOn === 'nameRadio' }
          />
        </label>
        <label htmlFor="firstLetterRadio">
          Primeira letra
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            id="firstLetterRadio"
            value="firstLetterRadio"
            checked={ radioOn === 'firstLetterRadio' }
          />
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Buscar
      </button>
      <br />
      { showAlertLetterRadio
        ? <alert>Sua busca deve conter somente 1 (um) caracter</alert> : null}
      <br />
      { noResultsApi === 'null'
        ? <alert>Sinto muito, não encontramos nenhuma receita para esses filtros.</alert>
        : null}
    </form>
  );
};

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SearchBar;
