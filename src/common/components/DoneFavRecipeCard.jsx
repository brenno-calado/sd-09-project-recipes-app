import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import Button from './buttons/Button';
import RecipesContext from '../../context/RecipesContext';
import ShareLikeButtons from './buttons/ShareLikeButtons';
import '../styles/detailsStyles.css';

function DoneRecipeCard({ history, index, recipe, favOrDone }) {
  const { shareClick, copied, setFavorite } = useContext(RecipesContext);
  const [fav, setFav] = useState(false);
  const recipeId = recipe.id;
  const url = `/${recipe.type}s/${recipeId}`;

  const verifyFavorite = useCallback(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isFav = favorites.find((item) => item.id === recipeId);
    setFavorite(isFav);
    setFav(isFav);
  }, [setFavorite, recipeId]);

  useEffect(() => {
    verifyFavorite(recipeId);
  }, [verifyFavorite, recipeId]);

  function renderTags() {
    if (recipe.type === 'comida') {
      return (
        <div>
          <p data-testid={ `${index}-${recipe.tags[0]}-horizontal-tag` }>
            { recipe.tags[0] }
          </p>
          <p data-testid={ `${index}-${recipe.tags[1]}-horizontal-tag` }>
            { recipe.tags[1] }
          </p>
        </div>
      );
    }
  }

  function redirectToRecipe(path) {
    history.push(path);
  }

  function renderImg() {
    return (
      <button type="button" onClick={ () => redirectToRecipe(url) }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt="done-recipe-thumb"
          width="150px"
        />
      </button>
    );
  }

  function renderName() {
    return (
      <button type="button" onClick={ () => redirectToRecipe(url) }>
        <h2 data-testid={ `${index}-horizontal-name` }>
          { recipe.name }
        </h2>
      </button>
    );
  }

  return (
    <div className="container">
      <div className="flex-container-row">
        { renderImg() }
        <div className="flex-container-column">
          <div className="flex-container-column">
            { recipe.type === 'comida' && (
              <h5 data-testid={ `${index}-horizontal-top-text` }>
                { `${recipe.area} - ${recipe.category}` }
              </h5>)}
            { recipe.type === 'bebida' && (
              <h5 data-testid={ `${index}-horizontal-top-text` }>
                { recipe.alcoholicOrNot }
              </h5>)}
            { renderName() }
          </div>
          <div>
            { favOrDone === 'done' && (
              <Button onClick={ () => shareClick(url) }>
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="share icon"
                  height="25px"
                />
              </Button>)}
            { favOrDone === 'done' && (
              <p data-testid={ `${index}-horizontal-done-date` }>
                { recipe.doneDate }
              </p>)}
            { favOrDone === 'done' && renderTags() }
            { favOrDone === 'fav' && (
              <ShareLikeButtons
                fav={ fav }
                url={ url }
                recipe={ recipe }
                complement={ `${index}-horizontal-` }
              />) }
            { copied ? <p>Link copiado!</p> : null }
          </div>
        </div>
      </div>
    </div>
  );
}

DoneRecipeCard.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  favOrDone: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    area: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    name: PropTypes.string,
    doneDate: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
  }).isRequired,
};

export default DoneRecipeCard;
