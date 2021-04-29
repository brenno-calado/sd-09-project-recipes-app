import React, { useState, useContext, useEffect } from 'react';
import fetchApi from '../services/index';
import MyContext from '../context/context';
import { useLocation, useHistory } from 'react-router';

function SearchBar() {
  const [ input, setInput ] = useState({
    radio: null,
    text: '',
  });

  const { setSearchFilter, searchFilter } = useContext(MyContext);
  const { pathname } = useLocation();
  const history = useHistory();

  const handleChange = ({target:{value, name}}) => {
    setInput({...input, [name]: value});
  }
  
  const redirectToDetailsById = () => {
    if (searchFilter.length === 1 && pathname === '/comidas') {
      history.push(`/comidas/${searchFilter[0].idMeal}`);
    } else if(searchFilter.length === 1 && pathname === '/bebidas') {
      history.push(`/bebidas/${searchFilter[0].idDrink}`);
    } else {
      return;
    };
  }

  const handleClick = async () => {
    const filter = input.text;
    let url = '';
    let apiResult = '';
    switch(input.radio) {
      case 'firstletter':
        if(input.text.length > 1) {
          alert('Sua busca deve conter somente 1 (um) caracter');
        } 
        if(pathname === '/comidas') {
          url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${filter[0]}`;
          apiResult = await fetchApi.fetchMealByFilter(url);
        } else if(pathname === '/bebidas') {
          url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${filter[0]}`;
          apiResult = await fetchApi.fetchDrinkByFilter(url);
        }
        setSearchFilter(apiResult);
        return url;
      case 'ingredients':
        if(pathname === '/comidas') {
          url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${filter}`;
          apiResult = await fetchApi.fetchMealByFilter(url);
        } else if(pathname === '/bebidas') {
          url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filter}`;
          apiResult = await fetchApi.fetchDrinkByFilter(url);
        }
        setSearchFilter(apiResult);
        return url;
      case 'name':
        if(pathname === '/comidas') {
          url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${filter}`;
          apiResult = await fetchApi.fetchMealByFilter(url);
        } else if(pathname === '/bebidas') {
          url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${filter}`;
          apiResult = await fetchApi.fetchDrinkByFilter(url);
        }
        setSearchFilter(apiResult);
        return url;
      default:
        return;
    }
  }
  
  useEffect(() => {
    redirectToDetailsById();
  },[searchFilter,redirectToDetailsById]);

  return (
    <div className="search-bar-container">
    <input type="text" name="text" data-testid="search-input" onChange={(e)=> handleChange(e)} />
    <div className="radio-container">
      <label
        htmlFor="ingredient-search-radio"
      >
        <input
          name="radio"
          type="radio"
          id="ingredient-search-radio"
          data-testid="ingredient-search-radio"
          value="ingredients"
          onChange={(e)=> handleChange(e)}
        />
        Ingrediente
      </label>
      <label
        htmlFor="name-search-radio"
      >
        <input
          name="radio"
          type="radio"
          id="name-search-radio"
          data-testid="name-search-radio"
          value="name"
          onChange={(e)=> handleChange(e)}
        />
        Nome
      </label>
      <label
        htmlFor="first-letter-search-radio"
      >
        <input
          name="radio"
          type="radio"
          id="first-letter-search-radio"
          data-testid="first-letter-search-radio"
          value="firstletter"
          onChange={(e)=> handleChange(e)}
        />
        Primeira letra
      </label>
    </div>
    <button
      type="button"
      data-testid="exec-search-btn"
      disabled={!input.radio}
      onClick={handleClick}
    >
      Buscar
    </button>
    </div>
  )
  
}

export default SearchBar;
