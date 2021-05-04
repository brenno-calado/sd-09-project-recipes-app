import React, { Component } from 'react';

class ButtonDrink extends Component {
  render() {
    return (
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
    );
  }
}

export default ButtonDrink;
