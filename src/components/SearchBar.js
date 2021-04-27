import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { getFoodResults } from '../services';

const SearchBar = () => {
  const baseSearchBar = {
    searchInput: '',
    radioOn: '',
  };

  const [searchState, setSearchState] = useState(baseSearchBar);
  const { setFoodApiResults } = useContext(AppContext);

  const handleClick = async () => {
    const { searchInput, radioOn } = searchState;
    const results = await getFoodResults(radioOn, searchInput);
    setFoodApiResults(results);
    console.log(results);
  };

  const handleChange = ({ target: { value, name } }) => {
    if (name === 'searchInput') setSearchState({ ...searchState, searchInput: value });
    // if (name === 'ingredientRadio') {
    //   setSearchState({ ...searchState, ingredientRadio: !searchState.ingredientRadio });
    // }
    // if (name === 'nameRadio') {
    //   setSearchState({ ...searchState, : !searchState.nameRadio });
    // }
    // if (name === 'firstLetterRadio') {
    //   setSearchState({ ...searchState, firstLetterRadio: !searchState.firstLetterRadio });
    // }
  };

  const handleRadio = ({ target: { value } }) => {
    setSearchState({ ...searchState, radioOn: value });
  };
  const { searchInput, radioOn } = searchState;
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
    </form>
  );
};

export default SearchBar;
