import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
import getVideoId from 'get-video-id';

import { fetchDrinkRecipeDetails, fetchMealRecipeDetails } from '../actions';

class MealDetails extends React.Component {
  constructor(props) {
    super(props);
    const { details, seekTheseDetails } = props;
    if (!details) {
      seekTheseDetails();
    }
  }

  render() {
    const { details, type } = this.props;
    const detailsAlt = details || {};
    return (
      (type === 'meals') ? (
        (
          <div>
            <img
              alt="Recipe"
              src={ detailsAlt.strMealThumb }
              data-testid="recipe-photo"
            />
            <h1 data-testid="recipe-title">{detailsAlt.strMeal}</h1>
            <p data-testid="recipe-category">{`Categoria: ${detailsAlt.strCategory}`}</p>
            <h2>Ingredients:</h2>
            <ul>
              {
                Array.from({ length: 20 }, (_, index) => `strIngredient${index + 1}`)
                  .map((strIngredient, index) => (
                    (detailsAlt[strIngredient]
                      && (
                        <li
                          key={ index }
                          data-testid={ `${index + 1}-ingredient-name-and-measure` }
                        >
                          {detailsAlt[strIngredient]}
                        </li>
                      )
                    ) || null))
              }
            </ul>
            <h2>Instructions:</h2>
            <p data-testid="instructions">{ detailsAlt.strInstructions }</p>
            {
              (detailsAlt.strYoutube
                && <YouTube videoId={ getVideoId(detailsAlt.strYoutube) } />) || null
            }
          </div>
        ) || null
      ) : (
        <p>a</p>
      ) || null
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { match: { params: { id } }, type } = ownProps;
  return (type === 'meals') ? {
    details: state.mealRecipeDetails[id],
  } : {
    details: state.drinkRecipeDetails[id],
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  seekTheseDetails: () => {
    const { match: { params: { id } }, type } = ownProps;
    if (type === 'meals') dispatch(fetchMealRecipeDetails(id));
    else dispatch(fetchDrinkRecipeDetails(id));
  },
});

MealDetails.propTypes = {
  details: PropTypes.objectOf,
  seekTheseDetails: PropTypes.func.isRequired,
};

MealDetails.defaultProps = {
  details: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(MealDetails);
