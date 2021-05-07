import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Share from '../Components/Share';
import FavoriteButton from '../Components/FavoriteButton';
import { fetchMealDetailsAPI } from '../services/ApiRequest';
import { addObj } from '../redux/actions';

const MAX_NUMBER_INGREDIENTS = 8;
class FoodProgress extends Component {
  constructor() {
    super();

    this.state = {
      meal: {},
      igredients: [],
      ok: false,
    };
    // this.getLocalStore = this.getLocalStore.bind(this);
    // this.addLocalStore = this.addLocalStore.bind(this);
    this.itemsDone = this.itemsDone.bind(this);
    this.recipeDone = this.recipeDone.bind(this);
    this.foodFavorit = this.foodFavorit.bind(this);
    this.sumblimeText = this.sumblimeText.bind(this);
  }

  componentDidMount() {
    document.querySelector('#finalizar').disabled = true;
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const { addObjFood } = this.props;
    fetchMealDetailsAPI(id)
      .then(({ meals }) => {
        addObjFood({
          id: meals[0].idMeal,
          type: 'comida',
          area: meals[0].strArea,
          category: meals[0].strCategory,
          alcoholicOrNot: '',
          name: meals[0].strMeal,
          image: meals[0].strMealThumb,
        });

        this.setState({ meal: meals[0], ok: true });
        const ingredients = Object.keys(meals[0])
          .filter((key) => key.includes('strIngredient'));
        this.setState({ igredients: ingredients });
      });
  }

  // getLocalStore(idObj) {
  //   const storage = JSON.parse(localStorage.getItem("inProgressRecipes"));
  //   const id = Object.keys(storage.cocktails).find((key) => key === idObj);
  //   if (id.length > 0) {
  //     this.setState({ localStorage: id[0] });
  //   };
  // }

  // addLocalStore() {
  //   const { meal } = this.state;
  //   const inputs = document.querySelectorAll('input');
  //   let array = [];
  //   const storage = JSON.parse(localStorage.getItem("inProgressRecipes"));
  //   if(storage !== null){
  //     inputs.forEach((value) => {
  //       array = [...array, value.checked];
  //     });
  //     localStorage.setItem("inProgressRecipes", JSON.stringify(
  //       {
  //         meals: {
  //           ...storage.meals,
  //           [meal.idMeal]: array,
  //         },
  //         cocktails: {
  //           ...storage.cocktails,
  //         }
  //       }
  //     ))
  //   }
  // }

  itemsDone() {
    const inputs = document.querySelectorAll('input');
    const button = document.querySelector('#finalizar');
    let array = [];
    inputs.forEach((value) => {
      array = [...array, value.checked];
    });
    array = array.every((value) => value === true);
    if (array) button.disabled = false;
    else button.disabled = true;
  }

  sumblimeText() {
    const label = document.querySelectorAll('label');
    const input = document.querySelectorAll('input');
    input.forEach((value, index) => {
      if (value.checked === true) label[index].style.textDecoration = 'line-through';
      else label[index].style = null;
    });
  }

  foodFavorit() {
    const { ok, meal } = this.state;
    if (ok) {
      return (
        <div>
          <FavoriteButton
            obj={ {
              id: meal.idMeal,
              type: 'comida',
              area: meal.strArea,
              category: meal.strCategory,
              alcoholicOrNot: '',
              name: meal.strMeal,
              image: meal.strMealThumb,
            } }
            test="favorite-btn"
          />
          <Share />
        </div>
      );
    }
  }

  recipeDone() {
    const { meal } = this.state;
    const { idMeal, strCategory, strMeal, strArea, strMealThumb, strTags } = meal;
    const now = new Date();
    const data = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

    const obj = {
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      doneDate: data,
      tags: [strTags],
    };
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes === null) localStorage.setItem('doneRecipes', JSON.stringify([obj]));
    else localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, obj]));
  }

  render() {
    const { meal, igredients } = this.state;
    const { strCategory, strMealThumb, strMeal, strInstructions } = meal;
    return (
      <div>
        <h1>Comidas em Progresso</h1>
        {this.foodFavorit()}
        <img data-testid="recipe-photo" src={ strMealThumb } alt={ strMeal } />
        <h2 data-testid="recipe-title">{strMeal}</h2>
        <h3 data-testid="recipe-category">{strCategory}</h3>
        <div onChange={ this.itemsDone } id="verifica">
          {igredients.map((value, index) => {
            if (meal[value] !== '' && index < MAX_NUMBER_INGREDIENTS) {
              return (
                <label
                  key={ index }
                  htmlFor={ index }
                  data-testid={ `${index}-ingredient-step` }
                >
                  {meal[value]}
                  <input
                    id={ index }
                    type="checkbox"
                    onClick={ this.sumblimeText }
                  />
                </label>
              );
            }
            return false;
          })}
        </div>
        <p data-testid="instructions">{strInstructions}</p>
        <Link
          to="/receitas-feitas"
        >
          <button
            type="button"
            data-testid="finish-recipe-btn"
            id="finalizar"
            onClick={ this.recipeDone }
          >
            Finalizar Receita
          </button>
        </Link>
      </div>
    );
  }
}

FoodProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  addObjFood: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addObjFood: (obj) => dispatch(addObj(obj)),
});

export default connect(null, mapDispatchToProps)(FoodProgress);
