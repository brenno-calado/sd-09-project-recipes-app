import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Style.css';

let inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
let recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
class index extends Component {
  getCurrentDate() {
    //  https://tecadmin.net/get-current-date-time-javascript/
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); 
    return date
  }
  recipe = () => {
    const { recipe } = this.props;
    if(recipe){console.log(recipe)};
    const data = {
      id: recipe.idMeal || recipe.idDrink,
      type: recipe.idMeal ? 'comida' : 'bebida',
      area: recipe.strArea ? recipe.strArea : '',
      category:  recipe.strCategory ? recipe.strCategory : '',
      alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
      name: recipe.strMeal ? recipe.strMeal : recipe.strDrink,
      image: recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb,
      doneDate: this.getCurrentDate(),
      tags: recipe.strTags ? recipe.strTags : '',
    }
    return data;
  }

  makeRecipeDone = () => {
    if(!recipesDone){
      localStorage.setItem('doneRecipes',JSON.stringify([]))
    }
    recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
    recipesDone.push(this.recipe())
    localStorage.setItem('doneRecipes',JSON.stringify(recipesDone))
    this.forceUpdate();
  }

  startRecipe = () => {
    const { ingredients } = this.props
    if(!inProgressRecipes){
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails:{},
        meals:{},
      }))
    }
    inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    const recipe = this.recipe()

    if(recipe.type === 'Comida'){
      inProgressRecipes.meals[recipe.id] = ingredients
    } else if(recipe.type === 'Bebida') {
      inProgressRecipes.cocktails[recipe.id] = ingredients
    }

    localStorage.setItem('inProgressRecipes',JSON.stringify(inProgressRecipes))
    this.forceUpdate();
  }

  isAlreadyDone = () => {
    const { id } = this.props;
    const recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
    if(recipesDone){
      return recipesDone.some((recipe) => recipe.id === id)
    }
    return false
  }

  isAlreadyStarted = () => {
    const { id } = this.props;
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if(!recipesInProgress){return}
    const recipe = this.recipe()
    if(recipe.type === 'Comida'){
      if(recipesInProgress.meals[recipe.id]){
        return true
      }
      return false
    }
    else if (recipe.type === 'Bebida'){
      if(recipesInProgress.cocktails[recipe.id]){
        return true
      }
      return false
    }
  }

  buttonStartRecipe = () => {
    const currentUrl = window.location.pathname;
    console.log(currentUrl)
    return (
      <Link to={`${currentUrl}/in-progress`}>
        <button
          data-testid="start-recipe-btn"
          type="button"
          className="start-recipe-btn"
          onClick={this.startRecipe}
        >
          Iniciar Receita
        </button>
      </Link>
    );
  }

  buttonContinueRecipe = () => {
    return (
      <button
        data-testid="start-recipe-btn"
        type="button"
        className="start-recipe-btn"
        onClick={console.log('Continua receita')}
      >
        Continuar Receita
      </button>
    );
  }

  render() {
    if(this.isAlreadyStarted()){return (this.buttonContinueRecipe())}
    if(!this.isAlreadyDone()){return (this.buttonStartRecipe())
    }
    return(
      <div></div>
    )
  }
}

export default index;
