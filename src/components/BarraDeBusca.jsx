import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ScreenContext, RecipesContext } from '../context';
import useRecipes from '../hooks/useRecipes';

export default function BarraDeBusca() {
  const [searchInfo, setSearchInfo] = useState({
    searchInput: '',
    criteria: '',
  });

  const { values: { category } } = useContext(ScreenContext);
  const { actions: { setRecipesResult } } = useContext(RecipesContext);

  const history = useHistory();

  const { getRecipes } = useRecipes();

  function onHandleChange(event) {
    const { name, value } = event.target;
    setSearchInfo({ ...searchInfo, [name]: value });
  }

  async function submitSearch() {
    const { searchInput, criteria } = searchInfo;
    const recipes = await getRecipes(category, searchInput, criteria);
    setRecipesResult(recipes);
    if (!Array.isArray(recipes)) {
      alert(recipes.message);
    } else if (!recipes.length) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else if (recipes.length === 1) {
      const idKey = Object.keys(recipes[0]).filter((key) => key.startsWith('id'));
      history.push(`/${category}/${recipes[0][idKey]}`);
    }
  }

  return (
    <section>
      <input
        type="text"
        data-testid="search-input"
        name="searchInput"
        onChange={ onHandleChange }
        value={ searchInfo.searchInput }
      />
      <div>
        <label htmlFor="ingredient-search">
          Ingrediente
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            name="criteria"
            id="ingredient-search"
            value="ingredient"
            onChange={ onHandleChange }
            checked={ searchInfo.criteria === 'ingredient' }
          />
        </label>
        <label htmlFor="name-search">
          Nome
          <input
            type="radio"
            data-testid="name-search-radio"
            name="criteria"
            id="name-search"
            value="name"
            onChange={ onHandleChange }
            checked={ searchInfo.criteria === 'name' }
          />
        </label>
        <label htmlFor="first-letter-search">
          Primeira letra
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            name="criteria"
            id="first-letter-search"
            value="firstLetter"
            onChange={ onHandleChange }
            checked={ searchInfo.criteria === 'firstLetter' }
          />
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ submitSearch }
      >
        Buscar

      </button>
    </section>
  );
}
