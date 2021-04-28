import React, { useState } from 'react';
import {
  Button,
  FormControl,
  InputGroup,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-bootstrap';

export default function SearchBar(location) {
  const [searchText, setSearchText] = useState('');
  const [searchOption, setSearchOption] = useState('');

  const handleTyping = ({ target }) => {
    setSearchText(target.value);
  };

  const handleOptions = ({ target }) => {
    setSearchOption(target.value);
  };

  console.log([location, searchOption]);

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
          value="Ingrediente"
        >
          Buscar pelo
          ingrediente
        </ToggleButton>
        <ToggleButton
          variant="outline-primary"
          data-testid="name-search-radio"
          onChange={ handleOptions }
          value="Nome"
        >
          Buscar pelo
          nome
        </ToggleButton>
        <ToggleButton
          variant="outline-primary"
          data-testid="first-letter-search-radio"
          onChange={ handleOptions }
          value="Primeira"
        >
          Buscar pela
          primeira letra
        </ToggleButton>
      </ToggleButtonGroup>
      <Button data-testid="exec-search-btn" variant="primary" block>Buscar</Button>
    </form>
  );
}
