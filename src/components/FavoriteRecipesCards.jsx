import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import { sendFavoriteRecipes } from '../redux/actions';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipesCards({ favoriteRecipes, favoriteRecipesDispatcher }) {
  const [showMessage, setShowMessage] = useState(false);

  const getLink = async (id, type) => {
    if (type === 'comida') {
      const magicNumber = 4000;
      const link = `http://localhost:3000/comidas/${id}`;
      await navigator.clipboard.writeText(link);
      setShowMessage(true);
      setTimeout(() => { setShowMessage(false); }, magicNumber);
    }
    if (type === 'bebida') {
      const magicNumber = 4000;
      const link = `http://localhost:3000/bebidas/${id}`;
      await navigator.clipboard.writeText(link);
      setShowMessage(true);
      setTimeout(() => { setShowMessage(false); }, magicNumber);
    }
  };

  const disfavor = (id) => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newArray = favorites.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
    favoriteRecipesDispatcher(newArray);
  };

  return (
    <div>
      {
        favoriteRecipes.map((recipe, index) => {
          const mealsTopText = (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${recipe.area} - ${recipe.category}`}
            </p>
          );
          const drinksTopText = (
            <p data-testid={ `${index}-horizontal-top-text` }>
              { recipe.alcoholicOrNot }
            </p>
          );
          return (
            <div key={ recipe.id } className="recipe-card">
              <Link
                to={ recipe.type === 'comida' ? (
                  `/comidas/${recipe.id}`
                ) : (
                  `/bebidas/${recipe.id}`
                ) }
              >
                <img
                  src={ recipe.image }
                  alt="recipe img"
                  data-testid={ `${index}-horizontal-image` }
                  className="recipe-card-img"
                />
              </Link>
              { recipe.type === 'comida' ? mealsTopText : drinksTopText }
              <Link
                to={ recipe.type === 'comida' ? (
                  `/comidas/${recipe.id}`
                ) : (
                  `/bebidas/${recipe.id}`
                ) }
              >
                <p data-testid={ `${index}-horizontal-name` }>
                  { recipe.name }
                </p>
              </Link>
              <p data-testid={ `${index}-horizontal-done-date` }>
                { recipe.doneDate }
              </p>
              <div>
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => getLink(recipe.id, recipe.type) }
                  src={ shareIcon }
                >
                  <img
                    src={ shareIcon }
                    alt="botao de compartilhar"
                  />
                </button>
                { showMessage && <p>Link copiado!</p> }
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  onClick={ () => disfavor(recipe.id) }
                  src={ blackHeartIcon }
                >
                  <img
                    src={ blackHeartIcon }
                    alt="botao de favoritar"
                  />
                </button>
              </div>
            </div>
          );
        })
      }
    </div>
  );
}

const mapStateToProps = (state) => ({
  favoriteRecipes: state.doneFavoriteReducer.favoriteRecipes,
});

const mapDispatchToProps = (dispatch) => ({
  favoriteRecipesDispatcher: (recipe) => dispatch(sendFavoriteRecipes(recipe)),
});

FavoriteRecipesCards.propTypes = {
  favoriteRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  favoriteRecipesDispatcher: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteRecipesCards);
