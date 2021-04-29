import React, { useState, useContext } from 'react';
import fetchApi from '../services/index';
import MyContext from '../context/context';

function SearchBar() {
  const [ input, setInput ] = useState({
    radio: null,
    text: '',
  });

  const { setSearchFilter } = useContext(MyContext);
 

  const handleChange = ({target:{value, name}}) => {
    setInput({...input, [name]: value});
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
        url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${filter[0]}`;
        apiResult = await fetchApi.fetchMealFilter(url);
        setSearchFilter(apiResult);
        return url;
      case 'ingredients':
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${filter}`;
        apiResult = await fetchApi.fetchMealFilter(url);
        setSearchFilter(apiResult);
        return url;
      case 'name':
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${filter}`;
        apiResult = await fetchApi.fetchMealFilter(url);
        setSearchFilter(apiResult);
        return url;
      default:
        return;
    }
  }
  
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
