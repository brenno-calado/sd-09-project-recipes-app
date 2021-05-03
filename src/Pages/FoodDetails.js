import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { foodDetailsThunk } from '../action/FoodAndDrinkDetailsAction';
import { drinksThunkAction } from '../action/FoodAndDrinkAction';
import CarouselFoodDetails from '../components/CarouselFoodDetails';
import '../styles/Details.css';
import { doneRecipesAction, inProgressRecipesAction } from '../action/ButtonAction';
import FoodCardDetails from '../components/FoodCardDetails';

class FoodDetails extends React.Component {
  constructor(props) {
    super(props);

    this.ingredientName = this.ingredientName.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } },
      setFoodDetails,
      setDrinks,
      getDrinkBoolean,
      getDrinkName,
      setDone,
      setProgress } = this.props;

    setFoodDetails(id);
    setDrinks('', getDrinkBoolean, getDrinkName);

    const localDone = JSON.parse(localStorage.getItem('doneRecipes'));
    setDone(localDone);

    const localProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setProgress(localProgress, 'meals');
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
    const totalIngredient = ingredientFilter.map((ingredient, index) => (
      <p key={ ingredient } data-testid={ `${index}-ingredient-name-and-measure` }>
        {
          measureFilter[index]
            ? <span>{`-${ingredient} - ${measureFilter[index]}`}</span>
            : <span>{`-${ingredient}`}</span>
        }
      </p>
    ));
    return totalIngredient;
  }

  render() {
    const { match: { params: { id } },
      getFoodDetails, getInProgress, getDoneRecipes } = this.props;

    let nameButton = 'Iniciar Receita';
    let classButton = true;

    if (getInProgress && Object.values(getInProgress.meals)
      .find((progress) => Object.keys(progress)[0] === id)) {
      nameButton = 'Continuar Receita';
    }

    if (getDoneRecipes && getDoneRecipes.find((done) => done.id === id)) {
      classButton = false;
    }

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
        <section className="section">
          <h3>Video</h3>
          <iframe
            title={ getFoodDetails.strMeal }
            width="340"
            height="165"
            src={ getFoodDetails.strYoutube }
            frameBorder="0"
            allowFullScreen
            data-testid="video"
          />
        </section>
        <section className="section">
          <h3>Recommended</h3>
          <CarouselFoodDetails className="carousel" />
        </section>
        <section className="bottom">
          { classButton && (
            <Link to={ `/comidas/${id}/in-progress` }>
              <button
                type="button"
                className="btnBottom button_start"
                data-testid="start-recipe-btn"
              >
                {nameButton}
              </button>
            </Link>
          )}
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  getFoodDetails: state.FoodAndDrinkDetailsReducer.foodDetails,
  getDrinks: state.FoodAndDrinkReducer.drinks,
  getDrinkName: state.FoodAndDrinkReducer.drinkName,
  getDrinkBoolean: state.FoodAndDrinkReducer.drinkBoolean,
  getInProgress: state.ButtonReducer.inProgressRecipes,
  getDoneRecipes: state.ButtonReducer.doneRecipes,
});

const mapDispatchToProps = (dispatch) => ({
  setFoodDetails: (id) => dispatch(foodDetailsThunk(id)),
  setDrinks: (drink, drinkBoolean, drinkName) => dispatch(
    drinksThunkAction(drink, drinkBoolean, drinkName),
  ),
  setDone: (done) => dispatch(doneRecipesAction(done)),
  setProgress: (progress, id) => dispatch(inProgressRecipesAction(progress, id)),
});

FoodDetails.propTypes = ({
  getFoodDetails: PropTypes.arrayOf(PropTypes.object),
  setFoodDetails: PropTypes.func,
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(FoodDetails);
