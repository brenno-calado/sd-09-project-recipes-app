import React, { Component } from 'react';
import Header from '../../components/header';
import CardHorizontal from '../../components/cardHorizontal';
import BtnsAllFoodDrinks from '../../components/btnsAllFoodDrinks';
import './recipesDone.css';

class index extends Component {
  constructor(props) {
    super(props);

    this.setStateByFilter = this.setStateByFilter.bind(this);

    this.state = {
      recipesDone: [],
    };
  }

  componentDidMount() {
    const recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
    if (recipesDone) this.setReacipesDone(recipesDone);
  }

  setStateByFilter(type) {
    const recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
    if (recipesDone) {
      switch (type) {
      case 'foods':
        this.setState((state) => ({
          ...state,
          recipesDone: recipesDone.filter((recipe) => recipe.type === 'comida'),
        }));
        break;
      case 'drinks':
        this.setState((state) => ({
          ...state,
          recipesDone: recipesDone.filter((recipe) => recipe.type === 'bebida'),
        }));
        break;
      default:
        this.setState((state) => ({
          ...state,
          recipesDone,
        }));
        break;
      }
    }
  }

  setReacipesDone(recipesDone) {
    this.setState((state) => ({ ...state, recipesDone }));
  }

  render() {
    const { recipesDone } = this.state;
    return (
      <div className="container-recipesDone">
        <Header title="Receitas Feitas" iconSearch="hidden" />
        <BtnsAllFoodDrinks setFilters={ this.setStateByFilter } />
        {
          recipesDone.map((recipe, indexCard) => (
            <CardHorizontal key={ indexCard } recipe={ recipe } indexCard={ indexCard } />
          ))
        }
      </div>
    );
  }
}

export default index;
