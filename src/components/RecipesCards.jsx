import React, { useEffect, useState } from 'react';
import BlackHartIcon from '../images/blackHeartIcon.svg';
import WhiteHartIcon from '../images/whiteHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipesCards() {
  const [favorite] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleFavoriteRecipes = () => {
    let recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (recipes === null) {
      recipes = [];
    }
    return recipes;
  };

  const getRemovedFavorite = (unfavorite) => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(unfavorite));
  };

  const handleClick = ({ target }) => {
    console.log(target.id);
    const storageItem = handleFavoriteRecipes();
    const unfavorite = storageItem.filter((item) => item.id !== target.id);
    getRemovedFavorite(unfavorite);
    handleFavoriteRecipes();
  };

  useEffect(() => {
    handleFavoriteRecipes();
  }, []);

  const shareBtn = ({ target: { id, name } }) => {
    copy(`http://localhost:3000/${name}s/${id}`);
    setCopied(true);
  };

  const { id, type } = handleFavoriteRecipes();

  return (
    <div className="">
      { handleFavoriteRecipes() === []
        ? <h3>Não existe nenhuma receita favoritada!</h3>
        : handleFavoriteRecipes().map((recipe, index) => (
          <div key={ index }>
            <img
              src={ recipe.image }
              alt="Recipe"
              data-testid={ `${index}-horizontal-image` }
              className="recipe-photo"
            />
            <h3 data-testid={ `${index}-horizontal-name` }>
              { recipe.name }
            </h3>
            <button
              className="main-buttons"
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ shareBtn }
              src="shareIcon"
            >
              { copied
                ? 'Link copiado!'
                : <img src={ ShareIcon } alt="share" name={ type } id={ id } /> }
            </button>
            <button
              className="main-buttons"
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              onClick={ handleClick }
              src="blackHeartIcon"
            >
              <img
                src={ favorite ? BlackHartIcon : WhiteHartIcon }
                id={ id }
                alt="favorite"
              />
            </button>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${recipe.alcoholicOrNot || recipe.area} - ${recipe.category}`}
            </p>
          </div>
        )) }
    </div>
  );
}

export default FavoriteRecipesCards;
