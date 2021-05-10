import React, { useEffect, useState } from 'react';
import RecipesCards from './RecipesCards';

function FavoriteRecipesCards() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const handleFavoriteRecipes = () => {
    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
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

  console.log(favoriteRecipes);
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
      { favoriteRecipes.length === 0
        ? <h3>Não existe nenhuma receita favoritada!</h3>
        : favoriteRecipes.map((recipe, index) => (
          <RecipesCards
            key={ recipe.id }
            index={ index }
            recipe={ recipe }
            onClick={ handleClick }
          />
        )) }
    </div>
  );
}

export default FavoriteRecipesCards;
