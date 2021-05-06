import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchThunkAction } from '../action/FoodAndDrinkAction';
import '../styles/Header.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.searchButton = this.searchButton.bind(this);

    this.state = {
      search: '',
      searchRadio: '',
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  searchButton() {
    const { setSearchBar, type } = this.props;
    const { searchRadio, search } = this.state;
    if (searchRadio === 'firstLetter' && search.length > 1) {
      return (
        window.alert('Sua busca deve conter somente 1 (um) caracter'));
    }
    setSearchBar(searchRadio, search, type);
  }

  render() {
    const { search } = this.state;

    return (
      <div className="header-search">
        <input
          type="text"
          name="search"
          value={ search }
          className="search-text"
          onChange={ this.handleChange }
          data-testid="search-input"
        />
        <div className="search-radio">
          <label htmlFor="ingredient">
            <input
              type="radio"
              id="ingredient"
              name="searchRadio"
              className="search-input-radio"
              value="ingredient"
              onChange={ this.handleChange }
              data-testid="ingredient-search-radio"
            />
            Ingrediente
          </label>
          <label htmlFor="name">
            <input
              type="radio"
              id="name"
              name="searchRadio"
              className="search-input-radio"
              value="name"
              onChange={ this.handleChange }
              data-testid="name-search-radio"
            />
            Nome
          </label>
          <label htmlFor="firstLetter">
            <input
              type="radio"
              id="firstLetter"
              name="searchRadio"
              className="search-input-radio"
              value="firstLetter"
              onChange={ this.handleChange }
              data-testid="first-letter-search-radio"
            />
            Primeira letra
          </label>
        </div>
        <button
          type="button"
          onClick={ this.searchButton }
          data-testid="exec-search-btn"
        >
          Buscar
        </button>
      </div>
    );
  }
}

SearchBar.propTypes = ({
  setSearchBar: PropTypes.func,
}).isRequired;

const mapDispatchToProps = (dispatch) => ({
  setSearchBar: (search, input, type) => dispatch(searchThunkAction(search, input, type)),
});

export default connect(null, mapDispatchToProps)(SearchBar);
