import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

const SearchBar = () => {
  const { searchBar, addSearchBar } = useContext(RecipesContext);
  const { text, radio } = searchBar;

  const handleChangeText = ({ target }) => {
    addSearchBar(target.value, radio);
  };

  const handleChangeRadio = ({ target }) => {
    addSearchBar(text, target.value);
  };

  const handleClick = () => {

  };

  return (
    <form>
      <label
        htmlFor="search-text-id"
        className="search-label"
      >
        Busca
        <input
          data-testid="search-input"
          id="search-text-id"
          type="text"
          name="text"
          placeholder="Digite o texto de busca"
          value={ text }
          onChange={ handleChangeText }
        />
      </label>
      <div onChange={ handleChangeRadio }>
        <label htmlFor="ingredient-id" data-testid="ingredient-search-radio">
          <input type="radio" name="radio" id="ingredient-id" value="ingredient" />
          Ingredientes
        </label>
        <label htmlFor="name-id" data-testid="name-search-radio">
          <input type="radio" name="radio" id="name-id" value="name" />
          Nome
        </label>
        <label htmlFor="first-letter-id" data-testid="first-letter-search-radio">
          <input type="radio" name="radio" id="first-letter-id" value="first-letter" />
          Primeira letra
        </label>
      </div>
      <button data-testid="exec-search-btn" type="button" onClick={ handleClick }>
        Buscar
      </button>
    </form>

  );
};

export default SearchBar;
