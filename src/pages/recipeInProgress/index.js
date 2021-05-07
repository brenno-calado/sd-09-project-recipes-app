import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImageHeader from '../../components/MealHeaderImage';
import HeaderInformations from '../../components/MealHeaderInfo';
import IngredientsChecklist from '../../components/IngredientesChecklist';
import Instructions from '../../components/MealInstructions';
import ButtonFinishRecipe from '../../components/ButtonFinishRecipe';
import { actionSaveRecipeOriginalData } from '../../actions';

import { requestMealData, requestDrinkData } from '../../services/api';

import loadingImage from '../../images/Figura-Loading-PNG.png';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeData: null,
    };

    this.renderIngredients = this.renderIngredients.bind(this);
  }

  async componentDidMount() {
    this.setMealData();
    console.log(await this.getRecipeData());
  }

  componentDidUpdate() {
    console.log('Atualizou');
  }

  async setMealData() {
    const { match: { params: { id, recipeType } } } = this.props;
    let recipeData = {};

    if (recipeType === 'comidas') {
      recipeData = await requestMealData(id);
      this.setState({
        recipeData: recipeData.meals[0],
      });
    } else if (recipeType === 'bebidas') {
      console.log('Fez bebida');
      recipeData = await requestDrinkData(id);
      this.setState({
        recipeData: recipeData.drinks[0],
      });
    }

    this.getMealImage = this.getMealImage.bind(this);
    this.getTitle = this.getTitle.bind(this);
    this.getCategory = this.getCategory.bind(this);
    this.getIngredients = this.getIngredients.bind(this);
    this.getIngredientsQuantity = this.getIngredientsQuantity.bind(this);
    this.getInsructions = this.getInsructions.bind(this);
    this.getIngredientsDone = this.getIngredientsDone.bind(this);
    this.isAllIngredientsDone = this.isAllIngredientsDone.bind(this);
  }

  getMealImage() {
    const { recipeData } = this.state;
    if (!recipeData) { return loadingImage; }
    return recipeData.strMealThumb || recipeData.strDrinkThumb;
  }

  getTitle() {
    const { recipeData } = this.state;
    if (!recipeData) { return 'Carregando'; }
    return recipeData.strMeal || recipeData.strDrink;
  }

  getCategory() {
    const { recipeData, recipeType } = this.state;
    if (!recipeData) { return 'Carregando'; }
    return recipeType === 'comidas' ? recipeData.strCategory : recipeData.strAlcoholic;
  }

  getIngredients() {
    const { recipeData } = this.state;
    if (!recipeData) { return ['Carregando']; }
    const ingredients = Object.entries(recipeData)
      .filter((element) => element[0].includes('strIngredient'))
      .filter((element) => element[1] !== '' && element[1] !== null)
      .map((element) => element[1]);

    return ingredients;
  }

  getIngredientsQuantity() {
    const { recipeData } = this.state;
    if (!recipeData) { return ['Carregando']; }
    const ingredientsQuantity = Object.entries(recipeData)
      .filter((element) => element[0].includes('strMeasure'))
      .filter((element) => element[1] !== '' && element[1] !== null)
      .map((element) => element[1]);

    return ingredientsQuantity;
  }

  getInsructions() {
    const { recipeData } = this.state;
    if (!recipeData) { return 'Carregando'; }
    return recipeData.strInstructions;
  }

  getIngredientsDone() {
    const { match: { params: { recipeType, id } } } = this.props;
    const allIngredientsDone = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipeType === 'comidas') {
      return [] || allIngredientsDone.meals[id];
    }
    if (recipeType === 'bebidas') {
      return [] || allIngredientsDone.cocktails[id];
    }
  }

  async getRecipeData() {
    const {
      match: { params: { id, recipeType } },
      recipeReduxId,
      saveRecipeData,
    } = this.props;
    if (id === recipeReduxId) { return null; }
    if (recipeType === 'comidas') {
      console.log('Vai fazer Fetch de comida');
      const mealData = await requestMealData(id);
      saveRecipeData(mealData.meals[0]);
    }
    if (recipeType === 'bebidas') {
      console.log('Vai fazer Fetch de bebida');
      const drinkData = await requestDrinkData(id);
      saveRecipeData(drinkData.drinks[0]);
    }
  }

  isAllIngredientsDone() {
    const ingredients = this.getIngredients();
    const ingredientsDone = this.getIngredientsDone();
    if (ingredients.length === ingredientsDone.length) {
      return true;
    }
    return false;
  }

  renderIngredients() {
    const ingredientes = this.getIngredients();
    if (!ingredientes.some((element) => element === 'Carregando')) {
      const { recipeData } = this.state;
      const { match: { params: { id, recipeType } } } = this.props;
      return (
        <IngredientsChecklist
          id={ id }
          recipeData={ recipeData }
          recipeType={ recipeType }
          ingredients={ this.getIngredients() }
          quantities={ this.getIngredientsQuantity() }
        />
      );
    }
    return null;
  }

  render() {
    const { recipeData } = this.state;
    const { match: { params: { id, recipeType } } } = this.props;
    return (
      <div>
        <ImageHeader
          image={ this.getMealImage() }
        />
        <HeaderInformations
          title={ this.getTitle() }
          category={ this.getCategory() }
          recipe={ recipeData }
          id={ id }
          recipeType={ recipeType }
        />
        {this.renderIngredients()}
        <Instructions instructions={ this.getInsructions() } />
        <ButtonFinishRecipe isDisabled={ !this.isAllIngredientsDone() } />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveRecipeData: (recipeData) => dispatch(actionSaveRecipeOriginalData(recipeData)),
});

const mapStateToProps = (state) => ({
  recipeReduxId: state.recipeData.id,
});

index.propTypes = {
  recipeReduxId: PropTypes.number.isRequired,
  saveRecipeData: PropTypes.func.isRequired,
  match: PropTypes.shape(
    {
      params: PropTypes.shape({
        id: PropTypes.number.isRequired,
        recipeType: PropTypes.string.isRequired,
      }),
    },
  ).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
