import React, { Component } from 'react';

class index extends Component {
  render() {
    const { ingredients } = this.props;
    return (
      <div>
        <h3>Ingredientes</h3>
        <div className="background-gray">
          <ul>
            {ingredients.map((ingrediente, index) => (
              <li
                key={ ingrediente }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {ingrediente}
              </li>))}
          </ul>
        </div>
      </div>
    );
  }
}

export default index;
