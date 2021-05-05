import React from 'react';
import { connect } from 'react-redux';
import { func, objectOf } from 'prop-types';
import { fetchRecipeByIdAction, recommendationsFetchAction } from '../actions';
import DetailsHeader from '../components/DetailsHeader';
import IngredientsList from '../components/IngredientsList';
import Instructions from '../components/Instructions';
import Recommendations from '../components/Recommendations';

class Details extends React.Component {
  componentDidMount() {
    const { match, fetchRecipeById, recommendationsFetch } = this.props;
    fetchRecipeById(match.params.id);
    recommendationsFetch();
  }

  render() {
    const { recipe, match, recommendations } = this.props;
    if (!recipe[0] && !recommendations[0]) return <p>Loading...</p>;
    return (
      <div>
        <DetailsHeader recipe={ recipe[0] } path={ match.path } />
        <IngredientsList recipe={ recipe[0] } />
        <Instructions recipe={ recipe[0] } />
        {recipe[0].strYoutube
          && <iframe
            data-testid="video"
            src={ `https://www.youtube.com/embed/${recipe[0].strYoutube.split('=')[1]}` }
            title={ recipe[0].strTags }
            width="360"
            height="200"
          />}
        <Recommendations />
        <button
          type="button"
          data-testid="start-recipe-btn"
        >
          Iniciar Receita
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recipe: state.recipeDetails.recipe,
  recommendations: state.recipeDetails.recommendations,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRecipeById: (id) => dispatch(fetchRecipeByIdAction(id)),
  recommendationsFetch: () => dispatch(recommendationsFetchAction()),
});

Details.propTypes = {
  fetchRecipeById: func,
  recommendationsFetch: func,
  match: objectOf,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Details);
