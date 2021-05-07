import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import { AppContext } from '../context/AppContext';
import FavoriteMealCard from '../components/FavoriteMealCard';
import FavoriteDrinkCard from '../components/FavoriteDrinkCard';
import '../CSS/ReceitasFeitasFavoritas.css';

function Perfil() {
  const { removeFromFavorite, favoriteRecipes } = useContext(AppContext);
  const [filterName, setFilterName] = useState('');

  const handleClick = ({ target }) => {
    const { value } = target;
    setFilterName(value);
  };

  const handleFavoriteButton = (id) => {
    removeFromFavorite(id);
  };

  const showFilteredMeal = () => (
    favoriteRecipes.filter((meal) => {
      switch (filterName) {
      case 'All':
        return favoriteRecipes;
      case 'Food':
        return meal.type === 'comida';
      case 'Drinks':
        return meal.type === 'bebida';
      default:
        return favoriteRecipes;
      }
    })
  );

  const arrRecipes = filterName ? showFilteredMeal() : favoriteRecipes;

  return (
    <div>
      <Header title="Receitas Favoritas" searchIcon={ false } />
      <section className="done-recipes-buttons">
        <button
          value="All"
          type="button"
          onClick={ handleClick }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          value="Food"
          type="button"
          onClick={ handleClick }
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          value="Drinks"
          type="button"
          onClick={ handleClick }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </section>
      {
        arrRecipes.map((recipe, index) => (
          recipe.type === 'comida'
            ? (
              <FavoriteMealCard
                key={ index }
                recipe={ recipe }
                index={ index }
                handleFavoriteButton={ handleFavoriteButton }
              />
            )
            : (
              <FavoriteDrinkCard
                key={ index }
                recipe={ recipe }
                index={ index }
                handleFavoriteButton={ handleFavoriteButton }
              />
            )
        ))
      }
    </div>

  );
}

export default Perfil;
