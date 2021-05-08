import React from 'react';
import { objectOf, number } from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

class FavoriteRecipeCard extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteBtn: true,
      linkCopied: '',
    };
    this.shareRecipe = this.shareRecipe.bind(this);
  }

  favoriteRecipe(/* recipe */) {
    /* const favRec = JSON.parse(localStorage.getItem('favoriteRecipes')); */
    /* console.log(favRec)
    if (favRec.includes(recipe)) {
      console.log('ola')
    } else {
      console.log('olaaa')
    } */
  }

  shareRecipe(recipe) {
    if (recipe.type === 'comida') {
      navigator.clipboard.writeText(`http://localhost:3000/comidas/${recipe.id}`);
      this.setState({ linkCopied: 'Link copiado!' });
    } else {
      navigator.clipboard.writeText(`http://localhost:3000/bebidas/${recipe.id}`);
      this.setState({ linkCopied: 'Link copiado!' });
    }
  }

  render() {
    const { recipe, index } = this.props;
    const { favoriteBtn, linkCopied } = this.state;
    return (
      <div>
        <img
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ `${index}-horizontal-image` }
        />
        { recipe.alcoholicOrNot !== ''
          ? (
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              { recipe.alcoholicOrNot }
            </p>)
          : (
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              { `${recipe.area} - ${recipe.category}` }
            </p>
          ) }
        <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
        <button
          type="button"
          onClick={ () => this.shareRecipe(recipe) }
        >
          <img
            src={ shareIcon }
            alt="Shere-Icon"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
        <button
          type="button"
          onClick={ () => this.favoriteRecipe(recipe) }
        >
          <img
            src={ favoriteBtn ? blackHeart : whiteHeart }
            alt="white-Heart"
            data-testid={ `${index}-horizontal-favorite-btn` }
          />
        </button>
        { linkCopied !== '' && <span>{ linkCopied }</span> }
      </div>
    );
  }
}

FavoriteRecipeCard.propTypes = {
  recipe: objectOf,
  index: number,
}.isRequired;

export default FavoriteRecipeCard;
