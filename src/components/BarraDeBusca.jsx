import React, { useState } from 'react';

export default function BarraDeBusca() {
  const [searchInfo, setSearchInfo] = useState({
    searchInput: '',
    criteria: '',
  });

  function onHandleChange(event) {
    const { name, value } = event.target;
    setSearchInfo({ ...searchInfo, [name]: value });
  }

  return (
    <section>
      <input
        type="text"
        data-testid="search-input"
        name="searchInput"
        onChange={ onHandleChange }
      />
      <div>
        <label htmlFor="ingredient-search">
          Ingrediente
          <input
            type="radio"
            name="criteria"
            id="ingredient-search"
            value="ingredient"
            onChange={ onHandleChange }
          />
        </label>
        <label htmlFor="name-search">
          Nome
          <input
            type="radio"
            name="criteria"
            id="name-search"
            value="name"
            onChange={ onHandleChange }
          />
        </label>
        <label htmlFor="first-letter-search">
          Primeira letra
          <input
            type="radio"
            name="criteria"
            id="first-letter-search"
            value="firstLetter"
            onChange={ onHandleChange }
          />
        </label>
      </div>
      <button type="button" data-testid="exec-search-btn">Buscar</button>
    </section>
  );
}
