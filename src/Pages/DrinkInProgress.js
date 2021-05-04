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
    this.doneRecipe = this.doneRecipe.bind(this);

    this.state = {
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
    if (localProgress && localProgress.cocktails && localProgress.cocktails[id]) {
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
    const { match: { params: { id } }, getDrinkDetails } = this.props;
    const localDone = JSON.parse(localStorage.getItem('doneRecipes'));
    const dNow = new Date();

    if (localDone && localDone.find((done) => done.id === id)) {
      return;
    }

    let doneRecipes = [];
    const done = {
      id,
      type: 'bebida',
      area: '',
      category: getDrinkDetails.strCategory,
      alcoholicOrNot: getDrinkDetails.strAlcoholic,
      name: getDrinkDetails.strDrink,
      image: getDrinkDetails.strDrinkThumb,
      doneDate: `${dNow.getDate()}/${dNow.getMonth()}/${dNow.getFullYear()}`,
      tags: '',
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
