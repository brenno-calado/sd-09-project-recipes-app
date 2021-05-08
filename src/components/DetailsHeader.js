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
      linkCopied: '',
    };
    this.shareRecipe = this.shareRecipe.bind(this);
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

  setNewitemToLocalStorage(recipe) {
    const favRec = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const query = window.location.pathname.includes('comidas') ? 'Meal' : 'Drink';
    const type = query === 'Meal' ? 'comida' : 'bebida';
    const isDrink = query === 'Drink' ? true : '';
    const isAlcoholic = isDrink ? 'Alcoholic' : '';
    const newfavoriteRecipe = {
      id: recipe[`id${query}`],
      type,
      area: recipe.strArea ? recipe.strArea : '',
      category: recipe.strCategory,
      alcoholicOrNot: isAlcoholic,
      name: recipe[`str${query}`],
      image: recipe[`str${query}Thumb`],
    };
    favRec.push(newfavoriteRecipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favRec));
  }

  favoriteRecipe(recipe) {
    const query = window.location.pathname.includes('comidas') ? 'Meal' : 'Drink';
    const type = query === 'Meal' ? 'comida' : 'bebida';
    const isDrink = query === 'Drink' ? true : '';
    const isAlcoholic = isDrink ? 'Alcoholic' : '';
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isFavorite = favoriteRecipes && favoriteRecipes.some((favRecipe) => (
      favRecipe.id === recipe[`id${query}`]));
    if (!favoriteRecipes) {
      const newfavoriteRecipe = [{
        id: recipe[`id${query}`],
        type,
        area: recipe.strArea ? recipe.strArea : '',
        category: recipe.strCategory,
        alcoholicOrNot: isAlcoholic,
        name: recipe[`str${query}`],
        image: recipe[`str${query}Thumb`],
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newfavoriteRecipe));
      this.setState({ favoriteBtn: true });
    } else if (favoriteRecipes && isFavorite) {
      const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const newFavorites = favRecipes.filter((recipes) => (
        recipe[`id${query}`] !== recipes.id));
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      this.setState({ favoriteBtn: false });
      if (favRecipes.length === 1) {
        localStorage.removeItem('favoriteRecipes');
      }
    } else if (favoriteRecipes && !isFavorite) {
      this.setNewitemToLocalStorage(recipe);
    }
  }

  shareRecipe() {
    const link = window.location.href;
    console.log(link);
    if (link.includes('/in-progress')) {
      const lastIndex = link.lastIndexOf('/in-progress');
      const linkToCopy = link.substr(0, lastIndex);
      navigator.clipboard.writeText(linkToCopy);
      this.setState({ linkCopied: 'Link copiado!' });
    } else {
      navigator.clipboard.writeText(link);
      this.setState({ linkCopied: 'Link copiado!' });
    }
  }

  render() {
    const { recipe, path } = this.props;
    const { favoriteBtn, linkCopied } = this.state;
    const query = path.includes('comidas') ? 'Meal' : 'Drink';
    return (
      <div className="details-header-container">
        <img
          className="details-header-img-recipe"
          src={ recipe[`str${query}Thumb`] }
          alt={ recipe[`str${query}`] }
          data-testid="recipe-photo"
        />
        <div className="details-header-wrap">
          <h1 data-testid="recipe-title">{recipe[`str${query}`]}</h1>
          <button
            type="button"
            onClick={ this.shareRecipe }
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
        {recipe.strAlcoholic
          ? <h3 data-testid="recipe-category">Alcoholic</h3>
          : <h3 data-testid="recipe-category">{recipe.strCategory}</h3>}
        { linkCopied !== '' && <span>{ linkCopied }</span> }
      </div>
    );
  }
}

DetailsHeader.propTypes = {
  recipe: objectOf,
  path: string,
}.isRequired;

export default DetailsHeader;
