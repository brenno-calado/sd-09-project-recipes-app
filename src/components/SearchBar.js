import React, { useContext } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

const SearchBar = () => {
  const pathName = useLocation().pathname.split('/');
  const { searchBar, addSearchBar, recipes, addRecipes } = useContext(RecipesContext);
  const { text, radio } = searchBar;
  let id;

  if (recipes.length === 1) {
    if (pathName[1] === 'comidas') {
      id = recipes[0].idMeal;
    } else {
      id = recipes[0].idDrink;
    }
  }

  const handleChangeText = ({ target }) => {
    addSearchBar(target.value, radio);
  };

  const handleChangeRadio = ({ target }) => {
    addSearchBar(text, target.value);
  };

  const handleClick = () => {
    if (radio === 'first-letter' && text.length !== 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      addRecipes(pathName[1], radio, text);
      console.log(recipes.length);
    }
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
      { recipes.length === 1 && (<Redirect to={ `/${pathName[1]}/${id}` } />) }
    </form>

  );
};

export default SearchBar;
