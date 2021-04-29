import React from 'react';
import PropTypes from 'prop-types';
import './Details.css';
import ReactPlayer from 'react-player/youtube';
import { fetchMealDetailsAPI, fetchCocktailAPI } from '../../services/ApiRequest';

class DetailsFood extends React.Component {
  constructor() {
    super();
    this.recomendar = this.recomendar.bind(this);
    this.lista = this.lista.bind(this);
    this.state = {
      meal: {},
      igredients: [],
      pounds: [],
      cooktails: [],
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    fetchMealDetailsAPI(id)
      .then(({ meals }) => {
        this.setState({ meal: meals[0] });

        const ing = Object.keys(meals[0]).filter((key) => key.includes('strIngredient'))
          .filter((value) => meals[0][value] !== ' '
            && meals[0][value] !== '' && meals[0][value] !== null);
        this.setState({ igredients: ing });

        const pou = Object.keys(meals[0]).filter((key) => key.includes('strMeasure'))
          .filter((value) => meals[0][value] !== ' '
            && meals[0][value] !== '' && meals[0][value] !== null);
        this.setState({ pounds: pou });
      });
    fetchCocktailAPI()
      .then(({ drinks }) => {
        this.setState({ cooktails: drinks });
      });
  }

  recomendar() {
    const { cooktails } = this.state;
    const num = 5;
    return (
      <div className="Card">
        {cooktails.filter((_, i) => i <= num)
          .map((value, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                src={ value.strDrinkThumb }
                alt={ value.strDrink }
                className="Imagem"
              />
              <h5
                data-testid={ `${index}-recomendation-title` }
              >
                {value.strDrink}
              </h5>
              <p>{value.strAlcoholic}</p>
            </div>
          ))}
      </div>
    );
  }

  lista() {
    const { meal, pounds, igredients } = this.state;
    return (
      <ol>
        {igredients.map((value, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${meal[value]} - ${meal[pounds[index]]}`}
          </li>
        ))}
      </ol>
    );
  }

  render() {
    const { meal } = this.state;
    const { strCategory, strMealThumb, strMeal, strInstructions, strYoutube } = meal;
    return (
      <div>
        <h1>Detalhes</h1>
        <button type="button" data-testid="share-btn">Compartilhar</button>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
        <img data-testid="recipe-photo" src={ strMealThumb } alt={ strMeal } />
        <h2 data-testid="recipe-title">{strMeal}</h2>
        <h3 data-testid="recipe-category">{strCategory}</h3>
        {this.lista()}
        <p data-testid="instructions">{strInstructions}</p>
        <ReactPlayer url={ strYoutube } data-testid="video" />
        {this.recomendar()}
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="fix"
        >
          Iniciar Receita
        </button>
      </div>
    );
  }
}

DetailsFood.propTypes = {
  match: PropTypes.objectOf.isRequired,
  params: PropTypes.objectOf.isRequired,
  id: PropTypes.string.isRequired,
};

export default DetailsFood;
