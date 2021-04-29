import React from 'react';
import { fetchDrinkDetailsAPI, fetchMealsAPI } from '../services/ApiRequest'

class DetailsDrinks extends React.Component {
  constructor() {
    super();
    this.recomendar = this.recomendar.bind(this)
    this.state = {
      drink: {},
      igredients: [],
      foods: []
    }
  }

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    fetchDrinkDetailsAPI(id)
    .then(({drinks}) => {
        console.log(drinks[0]);
      this.setState({drink: drinks[0]})
      const ingredients = Object.keys(drinks[0]).filter(key => key.includes('strIngredient'))
      this.setState({igredients: ingredients});
    })
    fetchMealsAPI()
      .then(({meals}) => {
      this.setState({foods: meals});
    })
  }

  recomendar() {
    const { foods } = this.state;
    return (
      foods.filter((_, i) => i <= 5)
      .map((value, index)=>(
        <div data-testid={`${index}-recomendation-card`}>
          <img src={ value.strMealThumb } alt={ value.strMeal } />
          <h5>{value.strMeal}</h5>
          <p>{value.strCategory}</p>
        </div>
      ))
    );
  }

  render() {
    const { drink, igredients } = this.state;
    const { strCategory, strDrinkThumb, strDrink, strInstructions } = drink
    return (
      <div>
        <h1>Detalhes</h1>
        <button type="button" data-testid="share-btn">Compartilhar</button>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
        <img data-testid="recipe-photo" src={ strDrinkThumb } alt={ strDrink } />
        <h2 data-testid="recipe-title">{strDrink}</h2>
        <h3 data-testid="recipe-category">{strCategory}</h3>
        <ol>
          {igredients.map((value, index) => {
            if (drink[value] !== null) {
            return(
              <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {drink[value]}
              </li>
            );
          }
        })}
        </ol>
        <p data-testid="instructions">{strInstructions}</p>
        {this.recomendar()}
        <button data-testid="start-recipe-btn" onClick={()=>console.log(this.state.igredients)}>Iniciar Receita</button>
      </div>
    );
  }
}

export default DetailsDrinks;
