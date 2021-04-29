import React from 'react';
import  ReactPlayer from 'react-player/youtube';
import { fetchMealDetailsAPI, fetchCocktailAPI } from '../services/ApiRequest'

class DetailsFood extends React.Component {
  constructor() {
    super();
    this.recomendar = this.recomendar.bind(this)
    this.state = {
      meal: {},
      igredients: [],
      cooktails: []
    }
  }

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    fetchMealDetailsAPI(id)
    .then(({meals}) => {
      this.setState({meal: meals[0]})
      const ingredients = Object.keys(meals[0]).filter(key => key.includes('strIngredient'))
      this.setState({igredients: ingredients});
    })
    fetchCocktailAPI()
  .then(({drinks}) => {
      this.setState({cooktails: drinks});
    })
  }

  recomendar() {
    const { cooktails } = this.state;
    return (
      cooktails.filter((_, i) => i <= 5)
      .map((value, index)=>(
        <div data-testid={`${index}-recomendation-card`}>
          <img src={value.strDrinkThumb} alt={value.strDrink} />
          <h5>{value.strDrink}</h5>
          <p>{value.strAlcoholic}</p>
        </div>
      ))
    );
  }

  render() {
    const { meal, igredients } = this.state;
    const { strCategory, strMealThumb, strMeal, strInstructions, strYoutube } = meal
    return (
      <div>
        <h1>Detalhes</h1>
        <button type="button" data-testid="share-btn">Compartilhar</button>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
        <img data-testid="recipe-photo" src={ strMealThumb } alt={ strMeal } />
        <h2 data-testid="recipe-title">{strMeal}</h2>
        <h3 data-testid="recipe-category">{strCategory}</h3>
        <ol>
          {igredients.map((value, index) => {
            if (meal[value] !== '') {
            return(
              <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {meal[value]}
              </li>
            );
          }
        })}
        </ol>
        <p data-testid="instructions">{strInstructions}</p>
        <ReactPlayer url={strYoutube} data-testid="video" />
        {this.recomendar()}
        <button data-testid="start-recipe-btn" onClick={()=>console.log(this.state.igredients)}>Iniciar Receita</button>
      </div>
    );
  }
}

export default DetailsFood;
