import React from 'react';
import { connect } from 'react-redux';
import { func, objectOf } from 'prop-types';
import CheckBoxIngredients from '../components/CheckBoxIngredients';
import { fetchRecipeInProgressAction } from '../actions';

class RecipesInProgress extends React.Component {
  componentDidMount() {
    const { fetchRecipeInProgress, match } = this.props;
    fetchRecipeInProgress(match.params.id);
  }

  render() {
    const { recipeInProgress } = this.props;
    return (
      <div>
        {recipeInProgress[0] && <CheckBoxIngredients recipeObj={ recipeInProgress[0] } />}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchRecipeInProgress: (id) => dispatch(fetchRecipeInProgressAction(id)),
});

const mapStateToProps = (state) => ({
  recipeInProgress: state.recipeInProgressReducer.recipeInProgress,
});

RecipesInProgress.propTypes = {
  fetchRecipeInProgress: func,
  match: objectOf,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(RecipesInProgress);
