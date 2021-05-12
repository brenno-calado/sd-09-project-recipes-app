import React from 'react';
import { connect } from 'react-redux';
import { func, objectOf } from 'prop-types';
import CheckBoxIngredients from '../components/CheckBoxIngredients';
import { fetchRecipeInProgressAction } from '../actions';
import DetailsHeader from '../components/DetailsHeader';
import Loader from '../components/Loader';

class RecipesInProgress extends React.Component {
  componentDidMount() {
    const { fetchRecipeInProgress, match } = this.props;
    fetchRecipeInProgress(match.params.id);
  }

  render() {
    const { recipeInProgress, match } = this.props;
    if (!recipeInProgress[0]) return <Loader />;
    return (
      <div>
        <DetailsHeader recipe={ recipeInProgress[0] } path={ match.path } />
        <CheckBoxIngredients recipeObj={ recipeInProgress[0] } />
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
