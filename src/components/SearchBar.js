import React from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { fatchRecipesAction } from '../actions';

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      radioSearchInput: '',
      searchInputValue: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.inputTextHandleChange = this.inputTextHandleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.id });
  }

  async inputTextHandleChange({ target }) {
    await this.setState({ searchInputValue: target.value });
    const { searchInputValue, radioSearchInput } = this.state;
    this.alertUser(radioSearchInput, searchInputValue);
  }

  alertUser(radioSearchInput, searchInputValue) {
    if (radioSearchInput === 'first-letter' && searchInputValue.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  }

  render() {
    const { fatchRecipes } = this.props;
    const { radioSearchInput, searchInputValue } = this.state;
    return (
      <div>
        <input
          data-testid="search-input"
          placeholder="Buscar"
          onChange={ this.inputTextHandleChange }
        />
        <label htmlFor="ingredient-search-radio">
          <input
            id="ingredient"
            type="radio"
            data-testid="ingredient-search-radio"
            name="radioSearchInput"
            onChange={ this.handleChange }
          />
          Ingrediente
        </label>
        <label htmlFor="name-search-radio">
          <input
            id="name"
            type="radio"
            data-testid="name-search-radio"
            name="radioSearchInput"
            onChange={ this.handleChange }
          />
          Nome
        </label>
        <label htmlFor="first-letter-search-radio">
          <input
            id="first-letter"
            type="radio"
            data-testid="first-letter-search-radio"
            name="radioSearchInput"
            onChange={ this.handleChange }
          />
          Primeira letra
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => fatchRecipes(radioSearchInput, searchInputValue) }
        >
          Buscar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispach) => ({
  fatchRecipes: (filter, searchInputValue) => dispach(
    fatchRecipesAction(filter, searchInputValue),
  ),
});

SearchBar.propTypes = {
  fatchRecipes: func,
}.isRequired;

export default connect(null, mapDispatchToProps)(SearchBar);
