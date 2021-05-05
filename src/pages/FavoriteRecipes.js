import React, { useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../css/FavoriteRecipes.css';

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
    <div className="favorite-recipes-container">
      <Header title="Receitas Favoritas" />
      <div className="filter-button-container-favorite">
        <button type="button" data-testid="filter-by-all-btn">
          All
        </button>
        <button type="button" data-testid="filter-by-food-btn">
          Food
        </button>
        <button type="button" data-testid="filter-by-drink-btn">
          Drinks
        </button>
      </div>
      { shareButton ? <span>Link copiado!</span> : null }
      {myStorageFavorite.map(
        ({ id, image, type, name, category, area, alcoholicOrNot }, index) => (
          type === 'comida'
            ? (
              <div key={ type } className="favorite-recipe-card">
                <img
                  src={ image }
                  alt="comida"
                  data-testid={ `${index}-horizontal-image` }
                />
                <div className="itens-favorite-recipe-card">
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { `${area} - ${category}` }
                  </p>
                  <p
                    data-testid={ `${index}-horizontal-name` }
                  >
                    { name }
                  </p>
                  <div className="container-buttons">
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
                </div>
              </div>
            ) : (
              <div key={ type } className="favorite-recipe-card">
                <img
                  src={ image }
                  alt="bebida"
                  data-testid={ `${index}-horizontal-image` }
                />
                <div className="itens-favorite-recipe-card">
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { alcoholicOrNot }
                  </p>
                  <p
                    data-testid={ `${index}-horizontal-name` }
                  >
                    { name }
                  </p>
                  <div className="container-buttons">
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
                  </div>
                </div>
              </div>
            )
        ),
      )}
    </div>
  );
};

export default FavoriteRecipes;
