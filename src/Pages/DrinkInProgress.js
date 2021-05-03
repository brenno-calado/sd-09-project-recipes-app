import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { inProgressRecipesAction } from '../action/ButtonAction';
import { drinkDetailsThunk } from '../action/FoodAndDrinkDetailsAction';
import DrinkCardDetails from '../components/DrinkCardDetails';
import '../styles/Details.css';

class InProgress extends React.Component {
  constructor(props) {
    super(props);

    this.buttonChecked = this.buttonChecked.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.checkedFunction = this.checkedFunction.bind(this);

    this.state = {
      isChecked: 0,
      totalInput: 1,
      progressChecked: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } }, setDrinkDetails, setProgress } = this.props;
    const { inProgressRecipes } = this.state;

    setDrinkDetails(id);
    setProgress(inProgressRecipes, 'cocktails');

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
        cocktails: {
          ...localProgress.cocktails,
          [id]: progressChecked,
        },
      };
    } else {
      ingredientProgress = {
        ...localProgress,
        cocktails: {
          [id]: progressChecked,
        },
      };
    }

    localStorage.setItem('inProgressRecipes', JSON.stringify(ingredientProgress));
  }

  checkedFunction(id) {
    const localProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (localProgress && localProgress.cocktails) {
      this.setState({ progressChecked: [...localProgress.cocktails[id]] });
    }
  }

  entreisLoop(drink, type) {
    let indexDetails = 1;
    let resultFilter = [];
    Object.entries(drink).filter((drinkFilter) => {
      if (drinkFilter[0] === `str${type}${indexDetails}` && drinkFilter[1]) {
        indexDetails += 1;
        resultFilter = [...resultFilter, drinkFilter[1]];
      }
      return drinkFilter;
    });
    return resultFilter;
  }

  ingredientName(drink) {
    const ingredientFilter = this.entreisLoop(drink, 'Ingredient');
    const measureFilter = this.entreisLoop(drink, 'Measure');
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
      </label>));
    return totalIngredient;
  }

  buttonChecked() {
    const ingredients = document.querySelectorAll('input');
    this.setState({ isChecked: 0, totalInput: ingredients.length });

    let progressChecked = [];

    if (ingredients.length > 0) {
      ingredients.forEach((ingredient, index) => {
        if (ingredient.checked) {
          progressChecked = [...progressChecked, index];
          this.setState((prevState) => ({
            isChecked: prevState.isChecked + 1,
          }));
        }
      });
    }

    this.setState({ progressChecked: [...progressChecked] });
  }

  renderButton() {
    const { isChecked, totalInput } = this.state;
    return (
      <section className="bottom">
        <Link to="/receitas-feitas">
          <button
            type="button"
            className="btnBottom button_start"
            data-testid="finish-recipe-btn"
            disabled={ isChecked !== totalInput }
          >
            Finalizar receita
          </button>
        </Link>
      </section>
    );
  }

  render() {
    const { match: { params: { id } }, getDrinkDetails } = this.props;

    return (
      <div className="main">
        <DrinkCardDetails id={ id } />
        <section className="section">
          <h3>Ingredients</h3>
          <div className="recipe">
            {this.ingredientName(getDrinkDetails)}
          </div>
        </section>
        <section className="section">
          <h3>Instructions</h3>
          <p
            data-testid="instructions"
            className="recipe"
          >
            {getDrinkDetails.strInstructions}
          </p>
        </section>
        { this.renderButton() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getDrinkDetails: state.FoodAndDrinkDetailsReducer.drinkDetails,
  getInProgress: state.ButtonReducer.inProgressRecipes,
});

const mapDispatchToProps = (dispatch) => ({
  setDrinkDetails: (id) => dispatch(drinkDetailsThunk(id)),
  setProgress: (progress, name) => dispatch(inProgressRecipesAction(progress, name)),
});

InProgress.propTypes = ({
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(InProgress);
