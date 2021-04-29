import React, { Component } from 'react';

class index extends Component {
  render() {
    const { instructions } = this.props;
    return (
      <div>
        <h3>Instructions</h3>
        <div className="background-gray">
          <p data-testid="instructions">
            {instructions}
          </p>
        </div>
      </div>
    );
  }
}

export default index;
