import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchDrinkDetailsAPI, fetchMealsAPI } from '../../services/ApiRequest';
import FavoriteButton from '../../Components/FavoriteButton';
import Share from '../../Components/Share';

class DetailsDrinks extends React.Component {
  constructor() {
    super();
    this.recomendar = this.recomendar.bind(this);
    this.favoriteOk = this.favoriteOk.bind(this);
    this.buttonStartOrContinue = this.buttonStartOrContinue.bind(this);
    this.state = {
      drink: {},
      igredients: [],
      pounds: [],
      foods: [],
      ok: false,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    fetchDrinkDetailsAPI(id)
      .then(({ drinks }) => {
        this.setState({ drink: drinks[0], ok: true });
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

  favoriteOk() {
    const { ok, drink } = this.state;
    if (ok === true) {
      return (
        <di>
          <FavoriteButton
            obj={ {
              id: drink.idDrink,
              type: 'bebida',
              area: '',
              category: drink.strCategory,
              alcoholicOrNot: drink.strAlcoholic,
              name: drink.strDrink,
              image: drink.strDrinkThumb,
            } }
            test="favorite-btn"
          />
          <Share />
        </di>
      );
    }
    return null;
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

  buttonStartOrContinue() {
    const { drink, ok } = this.state;
    let response = '';
    if (ok === true) {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (doneRecipes !== null) {
        response = doneRecipes.some((recipe) => recipe.id === drink.idDrink);
        if (response === true) {
          return (
            <button
              className="invisible"
              data-testid="start-recipe-btn"
              type="button"
            >
              Continuar Receita
            </button>
          );
        }
      }
      if (inProgressRecipes !== null) {
        const keysDrinks = Object.keys(inProgressRecipes.cocktails)
          .some((key) => key === drink.idDrink);
        if (keysDrinks === true) {
          return (
            <Link to={ `/bebidas/${drink.idDrink}/in-progress` }>
              <button
                className="fix"
                data-testid="start-recipe-btn"
                type="button"
              >
                Continuar Receita
              </button>
            </Link>
          );
        }
      }
      return (
        <Link to={ `/bebidas/${drink.idDrink}/in-progress` }>
          <button
            className="fix"
            data-testid="start-recipe-btn"
            type="button"
          >
            Iniciar Receita
          </button>
        </Link>
      );
    }
  }

  render() {
    const { drink, igredients, pounds } = this.state;
    const { strAlcoholic, strDrinkThumb, strDrink, strInstructions } = drink;
    return (
      <div>
        <h1>Detalhes</h1>
        {this.favoriteOk()}
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
        {this.buttonStartOrContinue()}
      </div>
    );
  }
}

DetailsDrinks.propTypes = {
  match: PropTypes.objectOf.isRequired,
  params: PropTypes.objectOf.isRequired,
  id: PropTypes.string.isRequired,
};

export default (DetailsDrinks);
