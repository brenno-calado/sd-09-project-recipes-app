import React, { Component } from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

class FavoriteButton extends Component {
  render() {
    return (
      <button
        src={ whiteHeartIcon }
        type="button"
        data-testid="favorite-btn"
      >
        { ' ' }
      </button>
    );
  }
}

export default FavoriteButton;
