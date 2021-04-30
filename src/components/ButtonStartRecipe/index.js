import React, { Component } from 'react';
import './Style.css';

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
      type: recipe.idMeal ? 'Comida' : 'Bebida',
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
    let recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
    if(!recipesDone){
      localStorage.setItem('doneRecipes',JSON.stringify([]))
    }
    recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
    recipesDone.push(this.recipe())
    localStorage.setItem('doneRecipes',JSON.stringify(recipesDone))
    this.forceUpdate();
  }

  isAlreadySaved = () => {
    const { id } = this.props;
    const recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
    if(recipesDone){
      return recipesDone.some((recipe) => recipe.id === id)
    }
    return false
  }

  button = () => {
    return (
      <button
        data-testid="start-recipe-btn"
        type="button"
        className="start-recipe-btn"
        onClick={this.makeRecipeDone}
      >
        {console.log(this.isAlreadySaved())}
        Iniciar Receita
      </button>
    );
  }

  render() {
    if(!this.isAlreadySaved()){
      return (
        this.button()
      )
    }
    return(
      <div></div>
    )
  }
}

export default index;
