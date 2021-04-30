import '../styles/Details.css';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { drinkDetailsThunk } from '../action/FoodAndDrinkDetailsAction';
import { foodThunkAction } from '../action/FoodAndDrinkAction';
import { doneRecipesAction,
  favoriteRecipesAction, inProgressRecipesAction } from '../action/ButtonAction';
import CarouselDrinkDetails from '../components/CarouselDrinkDetails';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

class DrinkDetails extends React.Component {
  constructor(props) {
    super(props);

    this.ingredientName = this.ingredientName.bind(this);
    this.copyCodeToClipboard = this.copyCodeToClipboard.bind(this);
    this.heartToggle = this.heartToggle.bind(this);
    this.verificFavorite = this.verificFavorite.bind(this);

    this.state = {
      linkCopy: false,
      heartToggle: false,
    };
  }

  componentDidMount() {
    const { match: { params: { id } },
      setDrinksDetails,
      setFood,
      getFoodBoolean,
      getFoodName,
      setDone,
      setProgress,
      setFavorite } = this.props;
    setDrinksDetails(id);
    setFood('', getFoodBoolean, getFoodName);
    const localDone = JSON.parse(localStorage.getItem('doneRecipes'));
    setDone(localDone);
    const localProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setProgress(localProgress, 'cocktails');
    const localFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorite(localFavorite);
    this.verificFavorite();
  }

  verificFavorite() {
    const { match: { params: { id } } } = this.props;
    const localFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (localFavorite && localFavorite.find((favorite) => favorite.id === id)) {
      this.setState({ heartToggle: true });
    }
  }

  entreisLoop(food, type) {
    let indexDetails = 1;
    let resultFilter = [];
    Object.entries(food).filter((foodFilter) => {
      if (foodFilter[0] === `str${type}${indexDetails}` && foodFilter[1]) {
        indexDetails += 1;
        resultFilter = [...resultFilter, foodFilter[1]];
      }
      return foodFilter;
    });
    return resultFilter;
  }

  ingredientName(drink) {
    const ingredientFilter = this.entreisLoop(drink, 'Ingredient');
    const measureFilter = this.entreisLoop(drink, 'Measure');
    const totalIngredient = ingredientFilter.map((ingredient, index) => (
      <p key={ ingredient } data-testid={ `${index}-ingredient-name-and-measure` }>
        {`-${ingredient} - ${measureFilter[index]}`}
      </p>
    ));
    return totalIngredient;
  }

  copyCodeToClipboard() {
    copy(window.location.href);
    this.setState({ linkCopy: true });
  }

  removeFavorite(favoriteRecipes) {
    const { match: { params: { id } }, setFavorite } = this.props;
    const favoriteFilter = favoriteRecipes.filter((favorite) => favorite.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteFilter));
    setFavorite(favoriteFilter);
  }

  heartToggle() {
    const { heartToggle } = this.state;
    const { getDrinkDetails, getFavorite, setFavorite } = this.props;
    const newFavorite = {
      id: getDrinkDetails.idDrink,
      type: 'bebida',
      area: '',
      category: getDrinkDetails.strCategory,
      alcoholicOrNot: getDrinkDetails.strAlcoholic,
      name: getDrinkDetails.strDrink,
      image: getDrinkDetails.strDrinkThumb,
    };
    let favoriteRecipes = [];
    if (getFavorite) {
      favoriteRecipes = [...getFavorite, newFavorite];
    } else {
      favoriteRecipes = [newFavorite];
    }
    if (heartToggle) {
      this.setState({ heartToggle: false });
      this.removeFavorite(favoriteRecipes);
    } else {
      this.setState({ heartToggle: true });
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      setFavorite(favoriteRecipes);
    }
  }

  render() {
    const { match: { params: { id } },
      getDrinkDetails, getInProgress, getDoneRecipes } = this.props;
    const { linkCopy, heartToggle } = this.state;
    let nameButton = 'Iniciar Receita';
    let classButton = true;
    if (getInProgress && Object.values(getInProgress.cocktails)
      .find((progress) => Object.keys(progress)[0] === id)) {
      nameButton = 'Continuar Receita';
    }
    if (getDoneRecipes && getDoneRecipes.find((done) => done.id === id)) {
      classButton = false;
    }
    return (
      <div>
        <div>
          <img
            src={ getDrinkDetails.strDrinkThumb }
            alt={ getDrinkDetails.strDrink }
            data-testid="recipe-photo"
            className="image"
          />
        </div>
        <div className="title">
          <h2 data-testid="recipe-title">{getDrinkDetails.strDrink}</h2>
          <div className="btns">
            <button
              className="btn"
              type="button"
              data-testid="share-btn"
              onClick={ () => this.copyCodeToClipboard() }
            >
              <img src={ shareIcon } alt="share" className="icoBtn" />
            </button>
            <button
              className="btn"
              type="button"
              onClick={ () => this.heartToggle() }
            >
              { heartToggle ? <img
                src={ blackHeartIcon }
                alt="favorit"
                data-testid="favorite-btn"
                className="icoBtn"
              /> : <img
                src={ whiteHeartIcon }
                alt="favorit"
                data-testid="favorite-btn"
                className="icoBtn"
              />}
            </button>
            { linkCopy && <p>Link copiado!</p> }
          </div>
        </div>
        <p data-testid="recipe-category">{getDrinkDetails.strAlcoholic}</p>
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
        <section className="section">
          <h3>Recommended</h3>
          <CarouselDrinkDetails className="carousel" />
        </section>
        <section className="bottom">
          { classButton && (
            <Link to={ `/bebidas/${id}/in-progress` }>
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
  getDrinkDetails: state.FoodAndDrinkDetailsReducer.drinkDetails,
  getFood: state.FoodAndDrinkReducer.food,
  getFoodName: state.FoodAndDrinkReducer.foodName,
  getFoodBoolean: state.FoodAndDrinkReducer.foodBoolean,
  getInProgress: state.ButtonReducer.inProgressRecipes,
  getDoneRecipes: state.ButtonReducer.doneRecipes,
  getFavorite: state.ButtonReducer.favoriteRecipes,
});

const mapDispatchToProps = (dispatch) => ({
  setDrinksDetails: (id) => dispatch(drinkDetailsThunk(id)),
  setFood: (food, drinkBoolean, drinkName) => dispatch(
    foodThunkAction(food, drinkBoolean, drinkName),
  ),
  setDone: (done) => dispatch(doneRecipesAction(done)),
  setProgress: (progress, name) => dispatch(inProgressRecipesAction(progress, name)),
  setFavorite: (favorite) => dispatch(favoriteRecipesAction(favorite)),
});

DrinkDetails.propTypes = ({
  getDrinkDetails: PropTypes.arrayOf(PropTypes.object),
  setDrinksDetails: PropTypes.func,
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(DrinkDetails);
