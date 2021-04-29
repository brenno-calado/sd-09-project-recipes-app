import React, { Component } from 'react';

import MealHeaderImage from '../../components/MealHeaderImage';
import MeadHeaderInfo from '../../components/MealHeaderInfo';
import MealIngredients from '../../components/MealIngredients';
import MealInstructions from '../../components/MealInstructions';
import MealVideo from '../../components/MealVideo';
import MealRecommendations from '../../components/MealRecommendations';

import loadingImage from '../../images/Figura-Loading-PNG.png'

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
    // this.setIngredientes();
    // this.setInstructions();
    // this.setVideo();
  }

  async setDrinkData() {
    const { match: { params: { id } } } = this.props;
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const drinkData = await fetch(url);
    const response = await drinkData.json();
    console.log(response);
    this.setState({
      drinkData: response.drinks[0],
    });
  }

  getDrinkImage = () => {
    const { drinkData } = this.state;
    if(!drinkData){return loadingImage}
    return drinkData.strDrinkThumb
  }

  getIngredients = () => {
    const { drinkData } = this.state;
    if(!drinkData){return ['Carregando']};
    const ingredientes = Object.entries(drinkData)
      .filter((element) => element[0].includes('strIngredient'))
      .filter((element) => element[1] !== '' && element[1] !== null)
      .map((element) => element[1]);

    return ingredientes
  }

  getInsructions = () => {
    const { drinkData } = this.state;
    if(!drinkData){return 'Carregando'};
    return drinkData.strInstructions
  }

  getRecommendations = () => {
    return ['Teste1', 'Teste 2', 'Teste 3', 'Teste 4', 'Teste 5', 'Teste 6']
  }

  getTitle = () => {
    const { drinkData } = this.state;
    if(!drinkData){return 'Carregando'};
    return drinkData.strDrink
  }

  getCategory = () => {
    const { drinkData } = this.state;
    if(!drinkData){return 'Carregando'};
    return drinkData.strCategory
  }

  render() {
    const { drinkImage, ingredientes, instructions } = this.state;
    {console.log(this.getIngredients())}
    return (
      <div>
        <MealHeaderImage image={ this.getDrinkImage() } />
        <MeadHeaderInfo title={ this.getTitle() } category={ this.getCategory() }/>
        <MealIngredients ingredients={ this.getIngredients() } />
        <MealInstructions instructions={ this.getInsructions() } />
        <MealRecommendations recommendations={ this.getRecommendations() } />
        <button data-testid="start-recipe-btn" type="button">
          Iniciar Receita
        </button>
      </div>
    );
  }
}

export default index;
