import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { input } = this.state;
    return (
      <section>
        <input
          name="input"
          type="text"
          data-testid="search-input"
          placeholder="Buscar Receita"
          value={ input }
          onChange={ this.handleChange }
        />
        <label htmlFor="ingredient-radio">
          <input
            type="radio"
            id="ingredient-radio"
            name="radio-search"
            data-testid="ingredient-search-radio"
          />
          Ingrediente
        </label>
        <label htmlFor="name-radio">
          <input
            type="radio"
            id="name-radio"
            name="radio-search"
            data-testid="name-search-radio"
          />
          Nome
        </label>
        <label htmlFor="first-letter-radio">
          <input
            type="radio"
            id="first-letter-radio"
            name="radio-search"
            data-testid="first-letter-search-radio"
          />
          Primeira-letra
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ this.submit() }
        >
          Buscar
        </button>
      </section>
    );
  }
}

export default SearchBar;
