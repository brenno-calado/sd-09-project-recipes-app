import React, { Component } from 'react';

import ImageHeader from '../../components/MealHeaderImage';
import HeaderInformations from '../../components/MealHeaderInfo';
import Ingredients from '../../components/MealIngredients';
import Instructions from '../../components/MealInstructions';

import { requestMealData, requestDrinkData } from '../../services/api';

import loadingImage from '../../images/Figura-Loading-PNG.png';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealData: false,
      recipeData: null,
      video: '',
      recommendedDrinks: ['Teste1'],
    };
  }

  async componentDidMount() {
    this.setMealData();
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
    console.log(recipeData.drinks[0]);
  }

  getMealImage = () => {
    const { recipeData } = this.state;
    if (!recipeData) { return loadingImage; }
    return recipeData.strMealThumb || recipeData.strDrinkThumb;
  }

  getTitle = () => {
    const { recipeData } = this.state;
    if (!recipeData) { return 'Carregando'; }
    return recipeData.strMeal || recipeData.strDrink;
  }

  getCategory = () => {
    const { recipeData, recipeType } = this.state;
    if (!recipeData) { return 'Carregando'; }
    return recipeType === 'comidas' ? recipeData.strCategory : recipeData.strAlcoholic;
  }

  getIngredients = () => {
    const { recipeData } = this.state;
    if (!recipeData) { return ['Carregando']; }
    const ingredients = Object.entries(recipeData)
      .filter((element) => element[0].includes('strIngredient'))
      .filter((element) => element[1] !== '' && element[1] !== null)
      .map((element) => element[1]);

    return ingredients;
  }

  getIngredientsQuantity = () => {
    const { recipeData } = this.state;
    if (!recipeData) { return ['Carregando']; }
    const ingredientsQuantity = Object.entries(recipeData)
      .filter((element) => element[0].includes('strMeasure'))
      .filter((element) => element[1] !== '' && element[1] !== null)
      .map((element) => element[1]);

    return ingredientsQuantity;
  }

  getInsructions = () => {
    const { recipeData } = this.state;
    if (!recipeData) { return 'Carregando'; }
    return recipeData.strInstructions;
  }

  render() {
    const { mealData } = this.state;
    const { match: { params: { id } } } = this.props;
    return (
      <div>
        <ImageHeader
          image={ this.getMealImage() }
        />
        <HeaderInformations
          title={ this.getTitle() }
          category={ this.getCategory() }
          recipe={ mealData }
          id={ id }
        />
        <Ingredients
          quantities={ this.getIngredientsQuantity() }
          isChecklist
        />
        <Instructions instructions={ this.getInsructions() } />
        <button type="button" data-testid="finish-recipe-btn">
          Finalizar Receita
        </button>
      </div>
    );
  }
}

export default index;
