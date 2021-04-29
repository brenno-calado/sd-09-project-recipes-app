import React, { useState } from 'react';
import { string } from 'prop-types';
import {
  Button,
  FormControl,
  InputGroup,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { searchMeals, searchDrinks } from '../actions';
import getFoodsAndDrinks from '../services/servicesAPI';

export default function SearchBar({ type }) {
  const [searchText, setSearchText] = useState('');
  const [searchOption, setSearchOption] = useState('getNameByValue');
  const dispatch = useDispatch();

  const handleTyping = ({ target }) => {
    setSearchText(target.value);
  };

  const handleOptions = ({ target }) => {
    setSearchOption(target.value);
  };

  const getSearchStringClearBar = () => {
    const myString = (
      searchOption === 'getFirstLetterByValue' ? searchText[0] : searchText);

    setSearchText('');

    return myString;
  };

  const handleSearch = async () => {
    if (searchText.length === 0) {
      return alert('Sua busca deve conter texto');
    }
    if (searchText.length > 1 && searchOption === 'getFirstLetterByValue') {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }

    const mySearchString = getSearchStringClearBar();

    try {
      const searchResult = await getFoodsAndDrinks(type, searchOption, mySearchString);
      if (searchResult.meals === null || searchResult.drinks === null) {
        throw new Error('Nothing found');
      }

      if (type === 'meals') {
        dispatch(searchMeals(searchResult.meals));
      } else {
        dispatch(searchDrinks(searchResult.drinks));
      }
    } catch (err) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      console.log(err);
    }
  };

  return (
    <form className="form-group">
      <InputGroup className="mb-3">
        <FormControl
          data-testid="search-input"
          value={ searchText }
          onChange={ handleTyping }
          placeholder="Buscar Receita"
        />
      </InputGroup>
      <ToggleButtonGroup
        type="radio"
        name="search-options"
        className="mb-3"
        size="sm"
        defaultValue="getNameByValue"
      >
        <ToggleButton
          variant="outline-secondary"
          data-testid="ingredient-search-radio"
          onChange={ handleOptions }
          value="getIngredientByValue"
        >
          Buscar pelo
          ingrediente
        </ToggleButton>
        <ToggleButton
          variant="outline-secondary"
          data-testid="name-search-radio"
          onChange={ handleOptions }
          value="getNameByValue"
        >
          Buscar pelo
          nome
        </ToggleButton>
        <ToggleButton
          variant="outline-secondary"
          data-testid="first-letter-search-radio"
          onChange={ handleOptions }
          value="getFirstLetterByValue"
        >
          Buscar pela
          primeira letra
        </ToggleButton>
      </ToggleButtonGroup>
      <Button
        data-testid="exec-search-btn"
        variant="secondary"
        onClick={ handleSearch }
        block
      >
        Buscar
      </Button>
    </form>
  );
}

SearchBar.propTypes = {
  type: string.isRequired,
};
