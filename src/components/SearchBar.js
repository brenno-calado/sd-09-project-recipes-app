import React, { useReducer, useState } from 'react';
import searchReducer from '../redux/reducers/search';
import setSearchOptions from '../redux/actions/search';
import fetchSearchRecipes from '../redux/actions/recipes';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [searchOption, setSearchOption] = useState('i');
  const [searchState, searchDispatch] = useReducer(searchReducer, {}); // Talvez precisa do INITIAL_STATE
  const isInvalidSearch = searchOption === 'f' && searchText.length > 1;
  console.log(searchState);

  return (
    <form>
      <input
        data-testid="search-input"
        type="text"
        onChange={ ({ target: { value } }) => setSearchText(value) }
      />
      <label htmlFor="ingredientInput">
        Ingrediente
        <input
          id="ingredientInput"
          data-testid="ingredient-search-radio"
          type="radio"
          name="searchOption"
          value="i"
          onClick={ ({ target: { value } }) => setSearchOption(value) }
        />
      </label>
      <label htmlFor="nameInput">
        Nome
        <input
          id="nameInput"
          data-testid="name-search-radio"
          type="radio"
          name="searchOption"
          value="s"
          onClick={ ({ target: { value } }) => setSearchOption(value) }
        />
      </label>
      <label htmlFor="firstLetterInput">
        Primeira Letra
        <input
          id="firstLetterInput"
          data-testid="first-letter-search-radio"
          type="radio"
          name="searchOption"
          value="f"
          onClick={ ({ target: { value } }) => setSearchOption(value) }
        />
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ () => {
          if (isInvalidSearch) {
            return alert('Sua busca deve conter somente 1 (um) caracter');
          }
          const searchParams = { [searchOption]: searchText };
          searchDispatch(setSearchOptions(searchParams));
          fetchSearchRecipes();
        } }
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
