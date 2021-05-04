import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavoriteButton from '../Components/FavoriteButton';
import Share from '../Components/Share';
import { fetchDrinkDetailsAPI } from '../services/ApiRequest';

class DrinkProgress extends Component {
  constructor() {
    super();
    this.sumblimeText = this.sumblimeText.bind(this);
    // this.addLocalStorage = this.addLocalStorage.bind(this);
    // this.checklocalStorage = this.checklocalStorage.bind(this);
    // this.checkedItems = this.checkedItems.bind(this);
    this.state = {
      drink: {},
      igredients: [],
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    fetchDrinkDetailsAPI(id)
      .then(({ drinks }) => {
        this.setState({ drink: drinks[0] });
        const ingredients = Object.keys(drinks[0])
          .filter((key) => key.includes('strIngredient'));
        this.setState({ igredients: ingredients });
      });
  }

  sumblimeText() {
    const label = document.querySelectorAll('label');
    const input = document.querySelectorAll('input');
    input.forEach((value, index) => {
      if (value.checked === true) label[index].style.textDecoration = 'line-through';
      else label[index].style = null;
    });
  }

  // checkedItems() {
  //   let validetion = 0;
  //   const checkeds = document.querySelectorAll('input');
  //   const button = document.querySelector('#finalizar');
  //   checkeds.forEach((checked) => {
  //     if (checked.checked === true) {
  //       console.log('dd');
  //     }
  //   });
  //   if (validetion === checkeds.length) button.disabled = true;
  //   if (validetion <= checkeds.length) button.disabled = false;
  // }

  // addLocalStorage() {
  //    const { drink } = this.state;
  //    const div = document.querySelector('#items');
  //    const obj = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //    if (obj !== null) {
  //      localStorage.setItem('inProgressRecipes',
  //        JSON.stringify({
  //          cocktails:{
  //            ...obj.cocktails,
  //            [drink.idDrink]:[ div.innerHTML]
  //          }
  //        })
  //      );
  //    }
  //    if (obj === null) {
  //      localStorage.setItem('inProgressRecipes',
  //        JSON.stringify({
  //          cocktails:{
  //            [drink.idDrink]:[ div.innerHTML]
  //          }
  //        })
  //      );
  //    }
  // }

  // checklocalStorage(id) {
  //   const obj = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   const div = document.querySelectorAll('#items')
  //   if (obj === null) {
  //     console.log([div], 'aqui');
  //     localStorage.setItem('inProgressRecipes',
  //       JSON.stringify({
  //         meals:{},
  //         cocktails:{
  //           [id]: [div[0].innerHTML]
  //         }
  //       })
  //     );
  //   }

  //   if(obj !== null) {
  //     const idDrink = Object.keys(obj.cocktails).some((key) => key === id);
  //     if (idDrink === true) {
  //       this.setState({ ok: true });
  //       console.log(obj.cocktails[id][0]);
  //     }
  //   }
  // }

  // ingredients(drink, igredients) {
  //   return (
  //     <div id="items">
  //       {
  //         igredients.map((value, index) => (
  //           if (drink[value] !== null) {
  //             return (
  //               <label
  //                 onClick={ this.checkedItems }
  //                 onClick={ this.sumblimeText }
  //                 key={ index }
  //                 htmlFor={ index }
  //                 data-testid={ `${index}-ingredient-step` }
  //               >
  //                 {drink[value]}
  //                 <input
  //                   id={ index }
  //                   type="checkbox"
  //                 />
  //               </label>
  //             );
  //           }
  //         ))
  //       }
  //     </div>
  //   );
  // }

  render() {
    const { drink, igredients } = this.state;
    const { match } = this.props;
    const { params: { id } } = match;
    const { strCategory, strDrinkThumb, strDrink, strInstructions } = drink;
    return (
      <div>
        <h1>Drink em Progresso </h1>
        <Share />
        <FavoriteButton />
        <img data-testid="recipe-photo" src={ strDrinkThumb } alt={ strDrink } />
        <h2 data-testid="recipe-title">{strDrink}</h2>
        <h3 data-testid="recipe-category">{strCategory}</h3>
        {() => this.igredients(drink, igredients)}
        <p data-testid="instructions">{strInstructions}</p>
        <Link
          to={ `/bebidas/${id}/receitas-feitas` }
        >
          <button
            id="finalizar"
            type="button"
            data-testid="finish-recipe-btn"
          >
            Finalizar Receita
          </button>
        </Link>
      </div>
    );
  }
}

DrinkProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DrinkProgress;
