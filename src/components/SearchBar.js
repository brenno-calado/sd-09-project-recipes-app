import React, { useState } from 'react';

function SearchBar() {
  const [state, setState] = useState({});

  const handleChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };

  const handleSearch = () => {
    console.log('pesquisando');
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
