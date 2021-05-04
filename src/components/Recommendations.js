import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class Recommendations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    const { type } = this.props;
    const { data } = this.state;
    if (!data) {
      if (type === 'meals') {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
          .then((response) => response.json())
          .then((responseData) => this.setState({ data: responseData.drinks }));
      }
      if (type === 'drinks') {
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
          .then((response) => response.json())
          .then((responseData) => this.setState({ data: responseData.meals }));
      }
    }
  }

  render() {
    const { data } = this.state;
    const RECOMMENDATIONS_COUNT = 6;
    return ((!data)
      ? <h1 style={ { textAlign: 'center' } }>Carregando recomendações...</h1>
      : (
        _.take(data, RECOMMENDATIONS_COUNT).map((recomendation, index) => (
          <p
            data-testid={ `${index}-recomendation-card` }
            key={ index }
          >
            Recommendation Placer
          </p>
        ))
      )
    );
  }
}

Recommendations.propTypes = {
  type: PropTypes.oneOf(['drinks', 'meals']).isRequired,
};

export default Recommendations;
