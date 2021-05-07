import React, { Component } from 'react';
import './Style.css';
import PropTypes from 'prop-types';

import MealHeaderImage from '../../components/MealHeaderImage';
import MealHeaderInfo from '../../components/MealHeaderInfo';
import MealIngredients from '../../components/MealIngredients';
import MealInstructions from '../../components/MealInstructions';
import MealVideo from '../../components/MealVideo';
import MealRecommendations from '../../components/MealRecommendations';
import ButtonStartRecipe from '../../components/ButtonStartRecipe';

import loadingImage from '../../images/loading_food.gif';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealData: false,
      video: '',
      recommendedDrinks: ['Teste1'],
    };
    this.getMealImage = this.getMealImage.bind(this);
    this.getIngredients = this.getIngredients.bind(this);
    this.getIngredientsQuantity = this.getIngredientsQuantity.bind(this);
    this.getInsructions = this.getInsructions.bind(this);
    this.getTitle = this.getTitle.bind(this);
    this.getCategory = this.getCategory.bind(this);
    this.getRecommendations = this.getRecommendations.bind(this);
  }

  async componentDidMount() {
    this.setMealData();
    this.setRecommendedDrinks();
  }

  async setMealData() {
    const { match: { params: { id } } } = this.props;
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const mealData = await fetch(url);
    const response = await mealData.json();
    this.setState({
      mealData: response.meals[0],
    });
  }

  async setRecommendedDrinks() {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const drinks = await fetch(url);
    const response = await drinks.json();
    response.drinks.length = 6;
    this.setState({
      recommendedDrinks: response.drinks,
    });
  }

  getMealImage() {
    const { mealData } = this.state;
    if (!mealData) { return loadingImage; }
    return mealData.strMealThumb;
  }

  getIngredients() {
    const { mealData } = this.state;
    if (!mealData) { return ['Carregando']; }
    const ingredients = Object.entries(mealData)
      .filter((element) => element[0].includes('strIngredient'))
      .filter((element) => element[1] !== '' && element[1] !== null)
      .map((element) => element[1]);

    return ingredients;
  }

  getIngredientsQuantity() {
    const { mealData } = this.state;
    if (!mealData) { return ['Carregando']; }
    const ingredientsQuantity = Object.entries(mealData)
      .filter((element) => element[0].includes('strMeasure'))
      .filter((element) => element[1] !== '' && element[1] !== null)
      .map((element) => element[1]);

    return ingredientsQuantity;
  }

  getInsructions() {
    const { mealData } = this.state;
    if (!mealData) { return 'Carregando'; }
    return mealData.strInstructions;
  }

  async getMealData() {
    const { match: { params: { id } } } = this.props;
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const mealData = await fetch(url);
    const response = await mealData.json();
    console.log(response);
    return response.meals[0];
  }

  getTitle() {
    const { mealData } = this.state;
    if (!mealData) { return 'Carregando'; }
    return mealData.strMeal;
  }

  getCategory() {
    const { mealData } = this.state;
    if (!mealData) { return 'Carregando'; }
    return mealData.strCategory;
  }

  getRecommendations() {
    const { recommendedDrinks } = this.state;
    return recommendedDrinks;
  }

  render() {
    const { mealData, video } = this.state;
    const { match: { params: { id } } } = this.props;
    return (
      <div>
        <MealHeaderImage image={ this.getMealImage() } />
        <MealHeaderInfo
          title={ this.getTitle() }
          category={ this.getCategory() }
          recipe={ mealData }
          id={ id }
          recipeType="comidas"
        />
        <MealIngredients
          ingredients={ this.getIngredients() }
          quantities={ this.getIngredientsQuantity() }
        />
        <MealInstructions instructions={ this.getInsructions() } />
        <MealVideo videoId={ video } />
        <MealRecommendations recommendations={ this.getRecommendations() } />
        <ButtonStartRecipe
          recipe={ mealData }
          id={ id }
          ingredients={ this.getIngredients() }
        />
      </div>
    );
  }
}

index.propTypes = {
  match: PropTypes.shape(
    {
      params: PropTypes.shape({
        id: PropTypes.number.isRequired,
        recipeType: PropTypes.string.isRequired,
      }),
    },
  ).isRequired,
};

export default index;
