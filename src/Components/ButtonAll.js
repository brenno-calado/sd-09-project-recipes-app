import React, { Component } from 'react';

class ButtonAll extends Component {
  render() {
    return (
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
    );
  }
}

export default ButtonAll;
