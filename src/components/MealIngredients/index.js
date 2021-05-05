import React, { Component } from 'react';
import PropTypes from 'prop-types';

class index extends Component {
  render() {
    const { ingredients, quantities } = this.props;
    return (
      <div>
        <h3>Ingredientes</h3>
        <div className="background-gray">
          <ul>
            {ingredients.map((ingredient, indexNumber) => (
              <li
                key={ ingredient }
                data-testid={ `${indexNumber}-ingredient-name-and-measure` }
              >
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
};

export default index;
