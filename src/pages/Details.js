import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { func, objectOf } from 'prop-types';
import { fetchRecipeByIdAction, recommendationsFetchAction } from '../actions';
import DetailsHeader from '../components/DetailsHeader';
import IngredientsList from '../components/IngredientsList';
import Instructions from '../components/Instructions';
import Recommendations from '../components/Recommendations';
import '../Style/Details/style.css';

class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      isStartedRecipe: false,
      renderBtn: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.setStartOrContinueBtn = this.setStartOrContinueBtn.bind(this);
    this.removeStartBtn = this.removeStartBtn.bind(this);
  }

  componentDidMount() {
    const { match, fetchRecipeById, recommendationsFetch } = this.props;
    fetchRecipeById(match.params.id);
    recommendationsFetch();
    this.setStartOrContinueBtn();
    this.removeStartBtn();
  }

  handleClick() {
    const { recipe } = this.props;
    let localStorageObject = {};
    const ingredientsArray = [];
    const mxmIngredients = 20;
    for (let index = 1; index <= mxmIngredients; index += 1) {
      if (recipe[0][`strIngredient${index}`] !== ''
      && recipe[0][`strIngredient${index}`] !== null) {
        ingredientsArray.push(recipe[0][`strIngredient${index}`]);
      }
    }
    console.log(window.location.pathname);
    if (window.location.pathname.includes('/comidas')) {
      localStorageObject = {
        meals: { [recipe[0].idMeal]: ingredientsArray },
        cocktails: {},
      };
    } else {
      localStorageObject = {
        meals: {},
        cocktails: { [recipe[0].idDrink]: ingredientsArray },
      };
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(localStorageObject));
  }

  setStartOrContinueBtn() {
    const { match } = this.props;
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const path = window.location.pathname;
    if (inProgress) {
      if (path.includes('/comidas')) {
        const isStarted = Object.keys(inProgress.meals).some((id) => (
          id === match.params.id));
        this.setState({ isStartedRecipe: isStarted });
      } else {
        const isStarted = Object.keys(inProgress.cocktails).some((id) => (
          id === match.params.id));
        this.setState({ isStartedRecipe: isStarted });
      }
    }
  }

  removeStartBtn() {
    const { match } = this.props;
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      const isDone = doneRecipes.some((recipe) => recipe.id === match.params.id);
      this.setState({ renderBtn: !isDone });
    }
  }

  render() {
    const { recipe, match, recommendations } = this.props;
    const { isStartedRecipe, renderBtn } = this.state;
    const location = window.location.pathname;
    if (!recipe) return <p>Loading...</p>;
    if (!recipe[0] || !recommendations[0]) return <p>Loading...</p>;
    return (
      <div className="details-container">
        <DetailsHeader recipe={ recipe[0] } path={ match.path } />
        <IngredientsList recipe={ recipe[0] } />
        <Instructions recipe={ recipe[0] } />
        <div className="details-youtube">
          {recipe[0].strYoutube
            && <iframe
              data-testid="video"
              src={ `https://www.youtube.com/embed/${recipe[0].strYoutube.split('=')[1]}` }
              title={ recipe[0].strTags }
              width="320"
              height="200"
            />}
        </div>
        <Recommendations />
        <div className="init-recipe-app">
          {renderBtn
          && (
            <Link to={ `${location}/in-progress` }>
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="start-btn"
                onClick={ this.handleClick }
              >
                {isStartedRecipe ? 'Continuar Receita' : 'Iniciar Receita'}
              </button>
            </Link>
          )}
        </div>
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
