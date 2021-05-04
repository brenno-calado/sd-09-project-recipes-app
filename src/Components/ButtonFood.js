import React, { Component } from 'react';

class ButtonFood extends Component {
  render() {
    return (
      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
    );
  }
}

export default ButtonFood;
