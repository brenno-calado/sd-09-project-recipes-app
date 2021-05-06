import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

index.propTypes = {
  instructions: PropTypes.string.isRequired,
};

export default index;
