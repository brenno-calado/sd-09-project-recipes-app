import React, { Component } from 'react';
import './Style.css';

import MealHeaderImage from '../../components/MealHeaderImage';
import MeadHeaderInfo from '../../components/MealHeaderInfo';
import MealIngredients from '../../components/MealIngredients';
import MealInstructions from '../../components/MealInstructions';
import MealVideo from '../../components/MealVideo';
import MealRecommendations from '../../components/MealRecommendations';

import loadingImage from '../../images/Figura-Loading-PNG.png';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealData: false,
      mealImage: '',
      ingredientes: [],
      instructions: '',
      video: '',
      recommendedDrinks: ['Teste1', 'Teste 2', 'Teste 3', 'Teste 4', 'Teste 5', 'Teste 6'],
    };
  }

  async componentDidMount() {
    this.setMealData()
    // this.setMealImage();
    // this.setIngredientes();
    // this.setInstructions();
    // this.setVideo();
  }

  async setMealData() {
    const { match: { params: { id } } } = this.props;
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const mealData = await fetch(url);
    const response = await mealData.json();
    console.log(response);
    this.setState({
      mealData: response.meals[0],
    });
  }

  getMealImage = () => {
    const { mealData } = this.state;
    if(!mealData){return loadingImage}
    return mealData.strMealThumb
  }

  getIngredients = () => {
    const { mealData } = this.state;
    if(!mealData){return ['Carregando']};
    const ingredientes = Object.entries(mealData)
      .filter((element) => element[0].includes('strIngredient'))
      .filter((element) => element[1] !== '' && element[1] !== null)
      .map((element) => element[1]);

    return ingredientes
  }

  getInsructions = () => {
    const { mealData } = this.state;
    if(!mealData){return 'Carregando'};
    return mealData.strInstructions
  }

  async getMealData() {
    const { match: { params: { id } } } = this.props;
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const mealData = await fetch(url);
    const response = await mealData.json();
    console.log(response);
    return response.meals[0];
  }

  async setMealImage() {
    const mealData = await this.getMealData();
    this.setState({
      mealImage: mealData.strMealThumb,
    });
  }

  async setIngredientes() {
    const mealData = await this.getMealData();
    const ingredientes = Object.entries(mealData)
      .filter((element) => element[0].includes('strIngredient'))
      .filter((element) => element[1] !== '' && element[1] !== null)
      .map((element) => element[1]);
    this.setState({
      ingredientes,
    });
  }

  async setInstructions() {
    const mealData = await this.getMealData();
    this.setState({
      instructions: mealData.strInstructions,
    });
  }

  async setVideo() {
    const mealData = await this.getMealData();
    this.setState({
      video: mealData.strYoutube,
    });
  }

  getTitle = () => {
    const { mealData } = this.state;
    if(!mealData){return 'Carregando'};
    return mealData.strMeal
  }

  getCategory = () => {
    const { mealData } = this.state;
    if(!mealData){return 'Carregando'};
    return mealData.strCategory
  }

  getRecommendations = () => {
    return ['Teste1', 'Teste 2', 'Teste 3', 'Teste 4', 'Teste 5', 'Teste 6']
  }

  render() {
    const { mealImage, ingredientes, instructions, video, recommendedDrinks } = this.state;
    return (
      <div>
        <MealHeaderImage image={ this.getMealImage() } />
        <MeadHeaderInfo title={ this.getTitle() } category={ this.getCategory()} />
        <MealIngredients ingredients={ this.getIngredients() } />
        <MealInstructions instructions={ this.getInsructions() } />
        <MealVideo videoId={ video } />
        <MealRecommendations recommendations={ this.getRecommendations() } />
        <button data-testid="start-recipe-btn" type="button">
          Iniciar Receita
        </button>
      </div>
    );
  }
}

export default index;
