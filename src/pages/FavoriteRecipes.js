import React, { useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const FavoriteRecipes = () => {
  const myStorageFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [shareButton, setShareButton] = useState(false);

  const clickShare = ({ target }) => {
    const { alt } = target;
    setShareButton(true);
    const myPath = `http://localhost:3000${alt}`;
    navigator.clipboard.writeText(myPath);
  };

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <button type="button" data-testid="filter-by-all-btn">
        All
      </button>
      <button type="button" data-testid="filter-by-food-btn">
        Food
      </button>
      <button type="button" data-testid="filter-by-drink-btn">
        Drinks
      </button>
      {myStorageFavorite.map(
        ({ id, image, type, name, category, area, alcoholicOrNot }, index) => (
          type === 'comida'
            ? (
              <div key={ type }>
                { shareButton ? <span>Link copiado!</span> : null }
                <span
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { `${area} - ${category}` }
                </span>
                <img
                  src={ image }
                  alt="comida"
                  data-testid={ `${index}-horizontal-image` }
                />
                <span
                  data-testid={ `${index}-horizontal-name` }
                >
                  { name }
                </span>
                <button
                  type="button"
                  onClick={ clickShare }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt={ `/${type}s/${id}` }
                  />
                </button>
                <button type="button">
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ blackHeartIcon }
                    alt="favorite"
                  />
                </button>
              </div>
            ) : (
              <div key={ type }>
                <button
                  type="button"
                  onClick={ clickShare }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt={ `${type}s/${id}` }
                  />
                </button>
                <button type="button">
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ blackHeartIcon }
                    alt="favorite"
                  />
                </button>
                { shareButton ? <span>Link copiado!</span> : null }
                <img
                  src={ image }
                  alt="bebida"
                  data-testid={ `${index}-horizontal-image` }
                />
                <span
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { alcoholicOrNot }
                </span>
                <span
                  data-testid={ `${index}-horizontal-name` }
                >
                  { name }
                </span>
              </div>
            )
        ),
      )}
    </div>
  );
};

export default FavoriteRecipes;
