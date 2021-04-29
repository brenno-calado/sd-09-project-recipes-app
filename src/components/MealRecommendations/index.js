import React, { Component } from 'react';

class index extends Component {
  render() {
    const { recommendations } = this.props;
    return (
      <div>
        {recommendations.map((drink, index) => <div data-testid={ `${index}-recomendation-card` }>{drink}</div>)}
      </div>
    );
  }
}

export default index;
