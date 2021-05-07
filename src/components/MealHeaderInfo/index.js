import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

class index extends Component {
  constructor() {
    super();
    this.state = {
      shareClicked: false,
      favoriteIcon: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.copyCurrentLink = this.copyCurrentLink.bind(this);
    this.recipeData = this.recipeData.bind(this);
    this.addFavoriteRecipe = this.addFavoriteRecipe.bind(this);
    this.removeFavoriteRecipe = this.removeFavoriteRecipe.bind(this);
    this.favoriteRecipeHandle = this.favoriteRecipeHandle.bind(this);
    this.setIsRecipeFavorite = this.setIsRecipeFavorite.bind(this);
  }

  componentDidMount() {
    this.setIsRecipeFavorite();
  }

  handleClick({ target: { name } }) {
    const { [name]: previous } = this.state;
    console.log(previous);
    this.setState({
      [name]: !previous,
    });
  }

  setIsRecipeFavorite() {
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const { id } = this.props;
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const found = favoriteRecipes.some((element) => element.id === id);
    console.log(found);
    this.setState({
      favoriteIcon: found,
    });
  }

  favoriteRecipeHandle() {
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const { id } = this.props;
    console.log(id);
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const found = favoriteRecipes.some((element) => element.id === id);
    if (found) {
      console.log('Tem no favoriros');
      this.removeFavoriteRecipe();
    }
    if (!found) { this.addFavoriteRecipe(); }
    this.setIsRecipeFavorite();
  }

  removeFavoriteRecipe() {
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const recipe = this.recipeData();

    favoriteRecipes = favoriteRecipes.filter((element) => element.id !== recipe.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    console.log('Desfavoritou');
  }

  addFavoriteRecipe() {
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const recipe = this.recipeData();
    console.log(recipe);
    favoriteRecipes.push(recipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    console.log('Favoritou');
  }

  recipeData() {
    const { recipe } = this.props;
    const recipeData = {
      id: recipe.idMeal || recipe.idDrink,
      type: recipe.idMeal ? 'comida' : 'bebida',
      area: recipe.strArea ? recipe.strArea : '',
      category: recipe.strCategory ? recipe.strCategory : '',
      alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
      name: recipe.strMeal ? recipe.strMeal : recipe.strDrink,
      image: recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb,
    };
    return recipeData;
  }

  copyCurrentLink() {
    const { shareClicked } = this.state;
    const { recipeType, id } = this.props;
    const { location: { protocol, host } } = window;
    const url = `${protocol}//${host}/${recipeType}/${id}`;

    //  https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
    navigator.clipboard.writeText(url);

    const actualShareState = shareClicked;
    this.setState({
      shareClicked: !actualShareState,
    });
  }

  render() {
    const { title, category } = this.props;
    const { shareClicked, favoriteIcon } = this.state;
    return (
      <div className="recipe-details-box">
        <div className="recipe-details-informations">
          <h2 data-testid="recipe-title">{title}</h2>
          <p data-testid="recipe-category" className="recipe-category">{category}</p>
        </div>
        <div>
          <div
            onClick={ this.copyCurrentLink }
            onKeyDown={ this.copyCurrentLink }
            role="button"
            tabIndex={ 0 }
          >
            <img
              src={ shareIcon }
              alt="shareIcon"
              data-testid="share-btn"
            />
            {shareClicked ? <p>Link copiado!</p> : null}
          </div>
          <div
            onClick={ this.favoriteRecipeHandle }
            onKeyDown={ this.favoriteRecipeHandle }
            role="button"
            tabIndex={ 0 }
          >
            <img
              src={ favoriteIcon ? blackHeartIcon : whiteHeartIcon }
              alt="whiteHeartIcon"
              name="favoriteIcon"
              data-testid="favorite-btn"
            />
          </div>
        </div>
      </div>
    );
  }
}

index.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  recipe: PropTypes.objectOf().isRequired,
  id: PropTypes.number.isRequired,
  recipeType: PropTypes.string.isRequired,
};

export default index;
