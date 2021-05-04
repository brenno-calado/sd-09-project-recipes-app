import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class index extends Component {
  dataTestId(isChecklist, indexNumber) {
    if (isChecklist) { return (`${indexNumber}-ingredient-step`); }
    return (`${indexNumber}-ingredient-name-and-measure`);
  }

  render() {
    const { ingredients, quantities, isChecklist } = this.props;
    return (
      <div>
        <h3>Ingredientes</h3>
        <div className="background-gray">
          <ul>
            {ingredients.map((ingredient, indexNumber) => (
              <li
                key={ ingredient }
                data-testid={ this.dataTestId(isChecklist, indexNumber) }
              >
                {isChecklist ? <input type="checkbox" /> : '- '}
                {isChecklist ? ' ' : null}
                {ingredient}
                {' - '}
                {quantities[indexNumber]}
              </li>))}
          </ul>
        </div>
      </div>
    );
  }
}

index.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
  quantities: PropTypes.arrayOf(PropTypes.string).isRequired,
  isChecklist: PropTypes.bool.isRequired,
};

export default index;
