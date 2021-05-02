import React from 'react';
import PropTypes from 'prop-types';
import { fetchDrinkDetailsAPI, fetchMealsAPI } from '../../services/ApiRequest';

class DetailsDrinks extends React.Component {
  constructor() {
    super();
    this.recomendar = this.recomendar.bind(this);
    this.state = {
      drink: {},
      igredients: [],
      pounds: [],
      foods: [],
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    fetchDrinkDetailsAPI(id)
      .then(({ drinks }) => {
        this.setState({ drink: drinks[0] });
        const ingr = Object.keys(drinks[0]).filter((key) => key.includes('strIngredient'))
          .filter((value) => drinks[0][value] !== ' '
            && drinks[0][value] !== '' && drinks[0][value] !== null);
        this.setState({ igredients: ingr });

        const pou = Object.keys(drinks[0]).filter((key) => key.includes('strMeasure'))
          .filter((value) => drinks[0][value] !== ' '
            && drinks[0][value] !== '' && drinks[0][value] !== null);
        this.setState({ pounds: pou });
      });
    fetchMealsAPI()
      .then(({ meals }) => {
        this.setState({ foods: meals });
      });
  }

  recomendar() {
    const num = 5;
    const { foods } = this.state;
    return (
      <div className="Card">
        {
          foods.filter((_, i) => i <= num)
            .map((val, index) => (
              <div key={ index } data-testid={ `${index}-recomendation-card` }>
                <img className="Imagem" src={ val.strMealThumb } alt={ val.strMeal } />
                <h5 data-testid={ `${index}-recomendation-title` }>{val.strMeal}</h5>
                <p>{val.strCategory}</p>
              </div>
            ))
        }
      </div>
    );
  }

  render() {
    const { drink, igredients, pounds } = this.state;
    const { strAlcoholic, strDrinkThumb, strDrink, strInstructions } = drink;
    return (
      <div>
        <h1>Detalhes</h1>
        <button type="button" data-testid="share-btn">Compartilhar</button>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
        <img data-testid="recipe-photo" src={ strDrinkThumb } alt={ strDrink } />
        <h2 data-testid="recipe-title">{strDrink}</h2>
        <h3 data-testid="recipe-category">{strAlcoholic}</h3>
        <ol>
          {igredients.map((value, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${drink[value]} - ${drink[pounds[index]]}`}
            </li>
          ))}
        </ol>
        <p data-testid="instructions">{strInstructions}</p>
        {this.recomendar()}
        <button
          className="fix"
          data-testid="start-recipe-btn"
          type="button"
        >
          Iniciar Receita
        </button>
      </div>
    );
  }
}

DetailsDrinks.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf.isRequired,
  }).isRequired,
};

export default DetailsDrinks;
