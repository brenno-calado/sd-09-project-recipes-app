import React, { Component } from 'react';
import Header from '../../components/header';
import BtnsAllFoodDrinks from '../../components/btnsAllFoodDrinks';
import CardFavoriteRecipe from '../../components/cardFavoriteRecipe';

class index extends Component {
  constructor(props) {
    super(props);

    this.setStateByFilter = this.setStateByFilter.bind(this);
    this.setFavoriteRecipes = this.setFavoriteRecipes.bind(this);

    this.state = {
      favoriteRecipes: [],
    };
  }

  componentDidMount() {
    this.setFavoriteRecipes();
  }

  setStateByFilter(type) {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      switch (type) {
      case 'foods':
        this.setState((state) => ({
          ...state,
          favoriteRecipes: favoriteRecipes.filter((recipe) => recipe.type === 'comida'),
        }));
        break;
      case 'drinks':
        this.setState((state) => ({
          ...state,
          favoriteRecipes: favoriteRecipes.filter((recipe) => recipe.type === 'bebida'),
        }));
        break;
      default:
        this.setState((state) => ({
          ...state,
          favoriteRecipes,
        }));
        break;
      }
    }
  }

  setFavoriteRecipes() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) this.setState((state) => ({ ...state, favoriteRecipes }));
  }

  render() {
    const { favoriteRecipes } = this.state;
    return (
      <div className="container-recipesDone">
        <Header title="Receitas Favoritas" iconSearch="hidden" />
        <BtnsAllFoodDrinks setFilters={ this.setStateByFilter } />
        {
          favoriteRecipes.map((recipe, indexCard) => (
            <CardFavoriteRecipe
              key={ indexCard }
              recipe={ recipe }
              indexCard={ indexCard }
              setStateFavoriteRecipes={ this.setFavoriteRecipes }
            />
          ))
        }
      </div>
    );
  }
}

export default index;
