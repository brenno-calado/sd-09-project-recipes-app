import React, { useContext, useState } from 'react';
import { Context } from '../context/Context';
import { fecthForName, fetchForFirstLetter, fetchForIngredients } from '../services/api';

function SearchBar() {
  const INITIAL_STATE = { search: '', searchBy: '' };
  const [state, setState] = useState(INITIAL_STATE);

  const { setSearchResult } = useContext(Context);

  const handleChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };

  const handleSearch = async () => {
    const { search, searchBy } = state;
    if (searchBy === 'firstLetter' && search.length > 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (searchBy === 'name') setSearchResult(await fecthForName(search));
    if (searchBy === 'ingredient') setSearchResult(await fetchForIngredients(search));
    if (searchBy === 'firstLetter') setSearchResult(await fetchForFirstLetter(search));
  };

  const createInput = (testid, name, type, value) => (
    <input
      data-testid={ testid }
      id={ value }
      name={ name }
      value={ value }
      type={ type }
      onChange={ handleChange }
    />
  );

  return (
    <section>
      { createInput('search-input', 'search', 'text') }

      <label htmlFor="ingredient">
        { createInput('ingredient-search-radio', 'searchBy', 'radio', 'ingredient') }
        Ingrediente
      </label>

      <label htmlFor="name">
        { createInput('name-search-radio', 'searchBy', 'radio', 'name') }
        Nome
      </label>

      <label htmlFor="firstLetter">
        { createInput('first-letter-search-radio', 'searchBy', 'radio', 'firstLetter') }
        Primeira letra
      </label>

      <button data-testid="exec-search-btn" type="button" onClick={ handleSearch }>
        Buscar
      </button>
    </section>
  );
}

export default SearchBar;
