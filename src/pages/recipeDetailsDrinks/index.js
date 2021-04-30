import React, { Component } from 'react';

import MealHeaderImage from '../../components/MealHeaderImage';
import MeadHeaderInfo from '../../components/MealHeaderInfo';
import MealIngredients from '../../components/MealIngredients';
import MealInstructions from '../../components/MealInstructions';
import MealVideo from '../../components/MealVideo';
import MealRecommendations from '../../components/MealRecommendations';
import ButtonStartRecipe from '../../components/ButtonStartRecipe';

import loadingImage from '../../images/Figura-Loading-PNG.png';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinkData: false,
      drinkImage: '',
      ingredientes: [],
      instructions: '',
      video: '',
      recommendedDrinks: ['Teste1', 'Teste 2', 'Teste 3', 'Teste 4', 'Teste 5', 'Teste 6'],
    };
  }

  async componentDidMount() {
    this.setDrinkData();
    this.setRecommendedFoods();
  }

  async setDrinkData() {
    const { match: { params: { id } } } = this.props;
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const drinkData = await fetch(url);
    const response = await drinkData.json();
    this.setState({
      drinkData: response.drinks[0],
    });
  }

  async setRecommendedFoods() {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const foods = await fetch(url);
    const response = await foods.json();
    response.meals.length = 6;
    this.setState({
      recommendedDrinks: response.meals,
    });
  }

  getDrinkImage = () => {
    const { drinkData } = this.state;
    if (!drinkData) { return loadingImage; }
    return drinkData.strDrinkThumb;
  }

  getIngredients = () => {
    const { drinkData } = this.state;
    if (!drinkData) { return ['Carregando']; }
    const ingredientes = Object.entries(drinkData)
      .filter((element) => element[0].includes('strIngredient'))
      .filter((element) => element[1] !== '' && element[1] !== null)
      .map((element) => element[1]);

    return ingredientes;
  }

  getInsructions = () => {
    const { drinkData } = this.state;
    if (!drinkData) { return 'Carregando'; }
    return drinkData.strInstructions;
  }

  getRecommendations = () => {
    const { recommendedDrinks } = this.state;
    return recommendedDrinks;
  }

  getIngredientsQuantity = () => {
    const { drinkData } = this.state;
    if (!drinkData) { return ['Carregando']; }
    const ingredientsQuantity = Object.entries(drinkData)
      .filter((element) => element[0].includes('strMeasure'))
      .filter((element) => element[1] !== '' && element[1] !== null)
      .map((element) => element[1]);

    return ingredientsQuantity;
  }

  getTitle = () => {
    const { drinkData } = this.state;
    if (!drinkData) { return 'Carregando'; }
    return drinkData.strDrink;
  }

  getCategory = () => {
    const { drinkData } = this.state;
    if (!drinkData) { return 'Carregando'; }
    return drinkData.strAlcoholic;
  }

  render() {
    const { drinkData } = this.state;
    const { match: { params: { id } } } = this.props;
    { console.log(this.getIngredients()); }
    return (
      <div>
        <MealHeaderImage image={ this.getDrinkImage() } />
        <MeadHeaderInfo title={ this.getTitle() } category={ this.getCategory() } recipe={ drinkData } id={ id } />
        <MealIngredients ingredients={ this.getIngredients() } quantities={ this.getIngredientsQuantity() } />
        <MealInstructions instructions={ this.getInsructions() } />
        <MealRecommendations recommendations={ this.getRecommendations() } />
        <ButtonStartRecipe recipe={ drinkData } id={ id } ingredients={ this.getIngredients() } />
      </div>
    );
  }
}

export default index;
