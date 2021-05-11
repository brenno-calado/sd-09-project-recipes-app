import React from 'react';
import { objectOf } from 'prop-types';

class Instructions extends React.Component {
  render() {
    const { recipe } = this.props;
    return (
      <div className="instructions">
        <h3>Instructions</h3>
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </div>
    );
  }
}

Instructions.propTypes = {
  recipe: objectOf,
}.isRequired;

export default Instructions;
