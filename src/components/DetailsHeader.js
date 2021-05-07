import React from 'react';
import { objectOf, string } from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

class DetailsHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteBtn: false,
    };
    /* this.favoriteRecipe = this.favoriteRecipe.bind(this); */
  }

  componentDidMount() {
    this.setFavoriteIcon();
  }

  setFavoriteIcon() {
    const { recipe } = this.props;
    const { favoriteBtn } = this.state;
    const query = window.location.pathname.includes('comidas') ? 'Meal' : 'Drink';
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes && favoriteBtn === false) {
      const isFavorite = favoriteRecipes.some((favRecipe) => (
        favRecipe.id === recipe[`id${query}`]));
      this.setState({ favoriteBtn: isFavorite });
    }
  }

  /* const isFavorite = favoriteRecipes.some((favRecipe) => (
    favRecipe.id === recipe[`id${query}`])); */

  favoriteRecipe(recipe) {
    console.log('recipe');
    const query = window.location.pathname.includes('comidas') ? 'Meal' : 'Drink';
    const type = query === 'Meal' ? 'comida' : 'bebida';
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isFavorite = favoriteRecipes && favoriteRecipes.some((favRecipe) => (
      favRecipe.id === recipe[`id${query}`]));
    if (!favoriteRecipes) {
      const newfavoriteRecipe = [{
        id: recipe[`id${query}`],
        type,
        area: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe[`str${query}`],
        image: recipe[`str${query}Thumb`],
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newfavoriteRecipe));
      this.setState({ favoriteBtn: true });
    } else if (favoriteRecipes && isFavorite) {
      const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const newFavorites = favRecipes.map((recipes) => (
        recipe[`id${query}`] !== recipes.id));
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      this.setState({ favoriteBtn: false });
    }
  }

  render() {
    const { recipe, path } = this.props;
    const { favoriteBtn } = this.state;
    const query = path.includes('comidas') ? 'Meal' : 'Drink';
    return (
      <div>
        <img
          src={ recipe[`str${query}Thumb`] }
          alt={ recipe[`str${query}`] }
          data-testid="recipe-photo"
        />
        <h1 data-testid="recipe-title">{recipe[`str${query}`]}</h1>
        {recipe.strAlcoholic
          ? <h3 data-testid="recipe-category">Alcoholic</h3>
          : <h3 data-testid="recipe-category">{recipe.strCategory}</h3>}
        <button
          type="button"
        >
          <img src={ shareIcon } alt="Shere-Icon" data-testid="share-btn" />
        </button>
        <button
          type="button"
          onClick={ () => this.favoriteRecipe(recipe) }
        >
          <img
            src={ favoriteBtn ? blackHeart : whiteHeart }
            alt="white-Heart"
            data-testid="favorite-btn"
          />
        </button>
      </div>
    );
  }
}

DetailsHeader.propTypes = {
  recipe: objectOf,
  path: string,
}.isRequired;

export default DetailsHeader;
