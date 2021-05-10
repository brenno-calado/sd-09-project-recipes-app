import React, { useEffect, useState } from 'react';
import BlackHartIcon from '../images/blackHeartIcon.svg';
import WhiteHartIcon from '../images/whiteHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipesCards() {
  const [favorite] = useState(true);
  const [copied, setCopied] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const handleFavoriteRecipes = () => {
    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
  };

  const handleClick = ({ target }) => {
    const storageItem = favoriteRecipes;
    const unfavorite = storageItem.filter((item) => item.id !== target.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(unfavorite));
    handleFavoriteRecipes();
  };

  const foodFilter = () => {
    const favoriteFood = favoriteRecipes.filter(({ type }) => type === 'comida');
    setFavoriteRecipes(favoriteFood);
  };

  const drinkFilter = () => {
    const favotiteDrink = favoriteRecipes.filter(({ type }) => type === 'bebida');
    setFavoriteRecipes(favotiteDrink);
  };

  useEffect(() => {
    handleFavoriteRecipes();
  }, []);

  const shareBtn = ({ target: { id, name } }) => {
    copy(`http://localhost:3000/${name}s/${id}`);
    setCopied(true);
  };

  const { id, type } = favoriteRecipes;

  return (
    <div className="">
      <div className="categories-container">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          className=""
          value="All"
          onClick={ handleFavoriteRecipes }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ foodFilter }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ drinkFilter }
        >
          Drinks
        </button>
      </div>
      { favoriteRecipes === []
        ? <h3>Não existe nenhuma receita favoritada!</h3>
        : favoriteRecipes.map((recipe, index) => (
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
