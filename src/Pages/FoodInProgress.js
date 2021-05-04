import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { inProgressRecipesAction } from '../action/ButtonAction';
import { foodDetailsThunk } from '../action/FoodAndDrinkDetailsAction';
import FoodCardDetails from '../components/FoodCardDetails';
import '../styles/Details.css';

class InProgress extends React.Component {
  constructor(props) {
    super(props);

    this.buttonChecked = this.buttonChecked.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.checkedFunction = this.checkedFunction.bind(this);
    this.doneRecipe = this.doneRecipe.bind(this);

    this.state = {
      progressChecked: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } }, setFoodDetails, setProgress } = this.props;
    const { inProgressRecipes } = this.state;

    setFoodDetails(id);
    setProgress(inProgressRecipes, 'meals');

    this.checkedFunction(id);
  }

  componentDidUpdate() {
    const localProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { match: { params: { id } } } = this.props;
    const { progressChecked } = this.state;
    let ingredientProgress = {};

    if (localProgress) {
      ingredientProgress = {
        ...localProgress,
        meals: {
          ...localProgress.meals,
          [id]: progressChecked,
        },
      };
    } else {
      ingredientProgress = {
        ...localProgress,
        meals: {
          [id]: progressChecked,
        },
      };
    }

    localStorage.setItem('inProgressRecipes', JSON.stringify(ingredientProgress));
  }

  checkedFunction(id) {
    const localProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (localProgress && localProgress.meals) {
      this.setState({ progressChecked: [...localProgress.meals[id]] });
    }
  }

  entreisLoop(food, type, bug) {
    let indexDetails = 1;
    let resultFilter = [];
    Object.entries(food).filter((foodFilter) => {
      if (foodFilter[0] === `str${type}${indexDetails}` && foodFilter[1] !== bug) {
        indexDetails += 1;
        resultFilter = [...resultFilter, foodFilter[1]];
      }
      return foodFilter;
    });
    return resultFilter;
  }

  ingredientName(food) {
    const ingredientFilter = this.entreisLoop(food, 'Ingredient', '');
    const measureFilter = this.entreisLoop(food, 'Measure', ' ');
    const { progressChecked } = this.state;

    const totalIngredient = ingredientFilter.map((ingredient, index) => (
      <label
        key={ ingredient }
        htmlFor={ `ingredient${index}` }
        data-testid={ `${index}-ingredient-step` }
      >
        <input
          type="checkbox"
          id={ `ingredient${index}` }
          name={ index }
          checked={ progressChecked.includes(index) }
          onChange={ this.buttonChecked }
        />
        {
          measureFilter[index]
            ? <span>{`-${ingredient} - ${measureFilter[index]}`}</span>
            : <span>{`-${ingredient}`}</span>
        }
      </label>
    ));
    return totalIngredient;
  }

  buttonChecked() {
    const ingredients = document.querySelectorAll('input');

    let progressChecked = [];

    if (ingredients.length > 0) {
      ingredients.forEach((ingredient, index) => {
        if (ingredient.checked) {
          progressChecked = [...progressChecked, index];
        }
      });
    }

    this.setState({ progressChecked: [...progressChecked] });
  }

  doneRecipe() {
    const { match: { params: { id } }, getFoodDetails } = this.props;
    const localDone = JSON.parse(localStorage.getItem('doneRecipes'));
    const dNow = new Date();

    if (localDone && localDone.find((done) => done.id === id)) {
      return;
    }

    let doneRecipes = [];
    const done = {
      id,
      type: 'comida',
      area: getFoodDetails.strArea,
      category: getFoodDetails.strCategory,
      alcoholicOrNot: '',
      name: getFoodDetails.strMeal,
      image: getFoodDetails.strMealThumb,
      doneDate: `${dNow.getDate()}/${dNow.getMonth()}/${dNow.getFullYear()}`,
      tags: getFoodDetails.strTags.split(','),
    };

    if (localDone) {
      doneRecipes = [
        ...localDone,
        done,
      ];
    } else {
      doneRecipes = [done];
    }
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  }

  renderButton() {
    const { progressChecked } = this.state;
    const ingredients = document.querySelectorAll('input');

    return (
      <section className="bottom">
        <Link to="/receitas-feitas">
          <button
            type="button"
            className="btnBottom button_start"
            data-testid="finish-recipe-btn"
            disabled={ progressChecked.length !== ingredients.length }
            onClick={ this.doneRecipe }
          >
            Finalizar receita
          </button>
        </Link>
      </section>
    );
  }

  render() {
    const { match: { params: { id } } } = this.props;
    const { getFoodDetails } = this.props;

    return (
      <div className="main">
        <FoodCardDetails id={ id } />
        <section className="section">
          <h3>Ingredients</h3>
          <div className="recipe">
            {this.ingredientName(getFoodDetails)}
          </div>
        </section>
        <section className="section">
          <h3>Instructions</h3>
          <p
            data-testid="instructions"
            className="recipe"
          >
            {getFoodDetails.strInstructions}
          </p>
        </section>
        { this.renderButton() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getFoodDetails: state.FoodAndDrinkDetailsReducer.foodDetails,
});

const mapDispatchToProps = (dispatch) => ({
  setFoodDetails: (id) => dispatch(foodDetailsThunk(id)),
  setProgress: (progress, name) => dispatch(inProgressRecipesAction(progress, name)),
});

InProgress.propTypes = ({
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(InProgress);
