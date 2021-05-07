import React from 'react';
import { Carousel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { objectOf } from 'prop-types';
import RecommendationCard from './RecommendationCard';
import 'bootstrap/dist/css/bootstrap.min.css';

class Recommendations extends React.Component {
  filterRecommendations() {
    const { recommendations } = this.props;
    const mxmRecommendations = 6;
    const recommendationsArray = recommendations
      .filter((_, index) => index < mxmRecommendations);
    return recommendationsArray;
  }

  render() {
    return (
      <div>
        <Carousel>
          {this.filterRecommendations()
            .map((recipe, index) => (
              <Carousel.Item
                interval={ 3000 }
                key={ index }
                data-testid={ `${index}-recomendation-card` }
              >
                <RecommendationCard recommendationRecipe={ recipe } index={ index } />
              </Carousel.Item>
            )) }
        </Carousel>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recommendations: state.recipeDetails.recommendations,
});

Recommendations.propTypes = {
  recommendations: objectOf,
}.isRequired;

export default connect(mapStateToProps)(Recommendations);
