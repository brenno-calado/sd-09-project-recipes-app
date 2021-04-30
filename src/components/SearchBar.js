import React, { useContext, useState } from 'react';
import { bool } from 'prop-types';
import { Context } from '../context';
import { fecthByName, fetchByFirstLetter, fetchByIngredient } from '../services/api';

function SearchBar({ isMeal }) {
  const { updateData } = useContext(Context);
  const [state, setState] = useState({ search: '', searchBy: '' });

  const handleChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };

  const handleSearch = () => {
    const { search, searchBy } = state;
    switch (searchBy) {
    case 'name':
      return updateData(fecthByName(search, isMeal));
    case 'ingredient':
      return updateData(fetchByIngredient(search, isMeal));
    case 'firstLetter':
      return search.length > 1
        ? window.alert('Sua busca deve conter somente 1 (um) caracter')
        : updateData(fetchByFirstLetter(search, isMeal));
    default:
      break;
    }
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

SearchBar.propTypes = {
  isMeal: bool.isRequired,
};

export default SearchBar;
