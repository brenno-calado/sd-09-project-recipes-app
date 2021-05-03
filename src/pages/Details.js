import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
    const { details } = this.props;
    return (
      (type === 'meals') ? (
        <div>
          <img alt="Recipe" src={ details.strMealThumb } data-testid="recipe-photo" />
        </div>
      ) : (
        <p>a</p>
      )
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
