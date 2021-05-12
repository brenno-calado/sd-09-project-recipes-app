import React, { Component } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

class FavoriteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: false,
    };
    this.saveRecipe = this.saveRecipe.bind(this);
    this.verificFavorit = this.verificFavorit.bind(this);
  }

  componentDidMount() {
    this.verificFavorit();
  }

  verificFavorit() {
    let drinks = [];
    const { obj } = this.props;
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes !== null) {
      drinks = favoriteRecipes.filter((value) => value.id === obj.id);
      if (drinks.length > 0) this.setState({ favorite: true });
    }
  }

  saveRecipe() {
    const { obj } = this.props;
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (favoriteRecipes === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([obj]));
      this.setState({ favorite: true });
    }

    if (favoriteRecipes !== null) {
      const drinks = favoriteRecipes.filter((value) => value.id === obj.id);
      if (drinks.length === 0) {
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify([...favoriteRecipes, obj]),
        );
        this.setState({ favorite: true });
      }
      if (drinks.length > 0) {
        const newObj = favoriteRecipes.filter((value) => value.id !== obj.id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(newObj));
        this.setState({ favorite: false });
      }
    }
  }

  render() {
    const { favorite } = this.state;
    const { test } = this.props;
    if (favorite === true) {
      return (
        <button
          type="button"
          data-testid={ test }
          onClick={ this.saveRecipe }
          src={ blackHeartIcon }
        >
          <img
            src={ blackHeartIcon }
            alt="favorite-icon"
          />
        </button>
      );
    }
    return (
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ this.saveRecipe }
        src={ whiteHeartIcon }
      >
        <img
          src={ whiteHeartIcon }
          alt="favorite-icon"
        />
      </button>
    );
  }
}

FavoriteButton.propTypes = {
  obj: PropTypes.objectOf.isRequired,
  test: PropTypes.string.isRequired,
};

export default FavoriteButton;
