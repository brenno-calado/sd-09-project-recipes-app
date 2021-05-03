import React, { useContext, useState } from 'react';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import { AppContext } from '../context/AppContext';
import FavoriteMealCard from '../components/FavoriteMealCard';
import FavoriteDrinkCard from '../components/FavoriteDrinkCard';

function Perfil() {
  const { removeFromFavorite } = useContext(AppContext);
  const localData = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [linkShared, setLinkShared] = useState(false);
  const [filterName, setFilterName] = useState('');

  const shareLink = (id, type) => {
    if (type === 'comida') {
      copy(`http://localhost:3000/comidas/${id}`);
    } else {
      copy(`http://localhost:3000/bebidas/${id}`);
    }

    setLinkShared(true);
  };

  const handleClick = ({ target }) => {
    const { value } = target;
    setFilterName(value);
  };

  const handleFavoriteButton = (id) => {
    removeFromFavorite(id);
  };

  const showFilteredMeal = () => (
    localData.filter((meal) => {
      switch (filterName) {
      case 'All':
        return localData;
      case 'Food':
        return meal.type === 'comida';
      case 'Drinks':
        return meal.type === 'bebida';
      default:
        return localData;
      }
    })
  );

  const arrRecipes = filterName ? showFilteredMeal() : localData;

  return (
    <div>
      <Header title="Receitas Favoritas" searchIcon={ false } />
      <section>
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
                linkShared={ linkShared }
                shareLink={ shareLink }
                handleFavoriteButton={ handleFavoriteButton }
              />
            )
            : (
              <FavoriteDrinkCard
                key={ index }
                recipe={ recipe }
                index={ index }
                linkShared={ linkShared }
                shareLink={ shareLink }
                handleFavoriteButton={ handleFavoriteButton }
              />
            )
        ))
      }
    </div>

  );
}

export default Perfil;
