import React from 'react';
import {
  Button,
  FormControl,
  InputGroup,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-bootstrap';

export default function SearchBar() {
  return (
    <form className="form-group margin-10">
      <InputGroup className="mb-3">
        <FormControl data-testid="search-input" size="lg" placeholder="Digite aqui" />
      </InputGroup>

      <ToggleButtonGroup type="radio" name="search-options" className="mb-3" size="sm">
        <ToggleButton
          variant="outline-primary"
          data-testid="ingredient-search-radio"
          value="Ingrediente"
        >
          Pesquisar por
          ingrediente
        </ToggleButton>
        <ToggleButton
          variant="outline-primary"
          data-testid="name-search-radio"
          value="Nome"
        >
          Pesquisar por
          nome
        </ToggleButton>
        <ToggleButton
          variant="outline-primary"
          data-testid="first-letter-search-radio"
          value="Primeira"
        >
          Pesquisar pela
          Primeira letra
        </ToggleButton>
      </ToggleButtonGroup>
      <Button data-testid="exec-search-btn" variant="primary" block>Buscar</Button>
    </form>
  );
}
