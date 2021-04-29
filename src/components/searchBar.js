import React, { useState } from 'react';
import { string } from 'prop-types';
import {
  Button,
  FormControl,
  InputGroup,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-bootstrap';
import getFoodsAndDrinks from '../services/servicesAPI';

export default function SearchBar({ type }) {
  const [searchText, setSearchText] = useState('');
  const [searchOption, setSearchOption] = useState('');

  const handleTyping = ({ target }) => {
    setSearchText(target.value);
  };

  const handleOptions = ({ target }) => {
    setSearchOption(target.value);
  };

  const getSearchStringClearBar = () => {
    const myString = (
      searchOption === 'getFirstLetterByValue' ? searchText[0] : searchText);
    console.log(myString);

    setSearchText('');
    console.log(myString);

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
      // fazer o dispatch
      const searchResult = await getFoodsAndDrinks(type, searchOption, mySearchString);
      // fazer o dispatch
      console.log(searchResult);
    } catch (err) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      console.log(err);
    }
  };

  return (
    <form className="form-group margin-10">
      <InputGroup className="mb-3">
        <FormControl
          data-testid="search-input"
          value={ searchText }
          onChange={ handleTyping }
          placeholder="Buscar Receita"
        />
      </InputGroup>
      <ToggleButtonGroup type="radio" name="search-options" className="mb-3" size="sm">
        <ToggleButton
          variant="outline-primary"
          data-testid="ingredient-search-radio"
          onChange={ handleOptions }
          value="getIngredientByValue"
        >
          Buscar pelo
          ingrediente
        </ToggleButton>
        <ToggleButton
          variant="outline-primary"
          data-testid="name-search-radio"
          onChange={ handleOptions }
          value="getNameByValue"
        >
          Buscar pelo
          nome
        </ToggleButton>
        <ToggleButton
          variant="outline-primary"
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
        variant="primary"
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
