import React, { useState } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { fetchSearch } from '../Redux/actions';
import './SearchBar.css';

function SearchBar(props) {
  const { foods = true } = props; // talvez seja necessário trocar a logica para a seleção da api
  const [search, setSearch] = useState({
    urlToUse: (foods) ? 'https://www.themealdb.com/api/json/v1/1/' : 'https://www.thecocktaildb.com/api/json/v1/1/',
    word: '',
    radio: 'filter.php?i=',
  });

  const handleChange = ({ target: { name, value } }) => {
    setSearch({ ...search, [name]: value });
  };

  const handleClick = () => {
    const { fetchSearchItems } = props;
    const { urlToUse, word, radio } = search;
    if (word.length >= 2 && radio === 'search.php?f=') {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const url = `${urlToUse}${radio}${word}`;
    fetchSearchItems(url);
  };

  const renderRadioButtons = () => (
    <div className="radio-buttons">
      <label htmlFor="ingredient-search-radio">
        <input
          type="radio"
          name="radio"
          value="filter.php?i="
          data-testid="ingredient-search-radio"
          id="ingredient-search-radio"
          onChange={ handleChange }
          checked={ search.radio === 'filter.php?i=' }
        />
        Ingredientes
      </label>
      <label htmlFor="name-search-radio">
        <input
          type="radio"
          name="radio"
          value="search.php?s="
          data-testid="name-search-radio"
          id="name-search-radio"
          onChange={ handleChange }
          checked={ search.radio === 'search.php?s=' }
        />
        Nome
      </label>
      <label htmlFor="first-letter-search-radio">
        <input
          type="radio"
          name="radio"
          value="search.php?f="
          data-testid="first-letter-search-radio"
          id="first-letter-search-radio"
          onChange={ handleChange }
          checked={ search.radio === 'search.php?f=' }
        />
        Primeira letra
      </label>
    </div>
  );

  return (
    <div className="SearchBar">
      <input
        type="text"
        data-testid="search-input"
        name="word"
        onChange={ handleChange }
      />
      {renderRadioButtons()}
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Buscar
      </button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchSearchItems: (url) => dispatch(fetchSearch(url)),
});

SearchBar.propTypes = {
  fetchSearchItems: func,
}.isRequired;

export default connect(null, mapDispatchToProps)(SearchBar);
