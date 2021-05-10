import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import FormControl from 'react-bootstrap/FormControl';
import { mealsThunk, cocktailsThunk } from '../redux/actions';

const SearchBar = ({
  pathname,
  mealsThunkDispatcher,
  cocktailsThunkDispatcher,
}) => {
  const [textSearch, setTextSearch] = useState('');
  const [radioSearch, setRadioSearch] = useState('');

  const handleClick = () => {
    if (radioSearch === 'first-letter-search' && textSearch.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      if (pathname === '/comidas') {
        mealsThunkDispatcher(radioSearch, textSearch);
      }
      if (pathname === '/bebidas') {
        cocktailsThunkDispatcher(radioSearch, textSearch);
      }
    }
  };

  const renderTitle = () => {
    switch (radioSearch) {
    case 'ingredient-search': return 'Ingrediente';
    case 'name-search': return 'Nome';
    case 'first-letter-search': return 'Primeira Letra';
    default: return 'Filtros';
    }
  };

  return (
    <div>
      <InputGroup>
        <FormControl
          placeholder="Digite sua busca"
          aria-describedby="basic-addon1"
          data-testid="search-input"
          name="search"
          id="search"
          value={ textSearch }
          onChange={ ({ target: { value } }) => setTextSearch(value) }
        />
        <DropdownButton
          as={ InputGroup.Append }
          variant="outline-secondary"
          title={ renderTitle() }
          id="input-group-dropdown-2"
          className="search-filters-dropdown"
        >
          <Dropdown.Item
            data-testid="ingredient-search-radio"
            id="ingredient-search"
            name="radio-filter"
            onClick={ ({ target: { id } }) => setRadioSearch(id) }
          >
            Ingrediente
          </Dropdown.Item>
          <Dropdown.Item
            data-testid="name-search-radio"
            id="name-search"
            name="radio-filter"
            onClick={ ({ target: { id } }) => setRadioSearch(id) }
          >
            Nome
          </Dropdown.Item>
          <Dropdown.Item
            data-testid="first-letter-search-radio"
            id="first-letter-search"
            name="radio-filter"
            onClick={ ({ target: { id } }) => setRadioSearch(id) }
          >
            Primeira letra
          </Dropdown.Item>
        </DropdownButton>
        <Button
          size="sm"
          type="button"
          variant="outline-primary"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Buscar
        </Button>
      </InputGroup>
    </div>
  );
};

const mapStateToProps = (state) => ({
  pathname: state.recipesReducer.pathname,
});

const mapDispatchToProps = (dispatch) => ({
  mealsThunkDispatcher:
    (radioSearch, textSearch) => dispatch(mealsThunk(radioSearch, textSearch)),
  cocktailsThunkDispatcher:
    (radioSearch, textSearch) => dispatch(cocktailsThunk(radioSearch, textSearch)),
});

SearchBar.propTypes = {
  pathname: PropTypes.string.isRequired,
  mealsThunkDispatcher: PropTypes.func.isRequired,
  cocktailsThunkDispatcher: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
