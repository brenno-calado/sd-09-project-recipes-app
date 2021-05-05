import React, { useEffect, useState } from 'react';
import HeaderFoods from '../components/HeaderFoods';
import RecipeDoneCard from '../components/RecipeDoneCard';

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  const [favorite, setFavorite] = useState(true);
  const [buttonSelect, setButtonSelect] = useState('all');

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteRecipe = favoriteRecipes && favoriteRecipes.map((
      { type, id, image, name, category, area, alcoholicOrNot,
      }, index,
    ) => {
      if (type === 'comida') {
        return (<RecipeDoneCard
          key={ id }
          image={ image }
          name={ name }
          index={ index }
          category={ category }
          area={ area }
          id={ id }
          setFavorite={ setFavorite }
          favorite={ favorite }
          type={ type }
        />);
      }

      if (type === 'bebida') {
        return (<RecipeDoneCard
          key={ id }
          image={ image }
          name={ name }
          index={ index }
          category={ alcoholicOrNot }
          area={ area }
          id={ id }
          setFavorite={ setFavorite }
          favorite={ favorite }
          type={ type }
        />);
      }
      return '';
    });
    setFavorites(favoriteRecipe);
  }, [favorite]);

  function handleButtonFilterName({ target }) {
    const { name } = target;
    setButtonSelect(name);
    console.log(name);
  }

  function renderFood() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteRecipe = favoriteRecipes && favoriteRecipes.map((
      { type, id, image, name, category, area,
      }, index,
    ) => {
      if (type === 'comida') {
        return (<RecipeDoneCard
          key={ Math.random() }
          image={ image }
          name={ name }
          index={ index }
          category={ category }
          area={ area }
          id={ id }
          setFavorite={ setFavorite }
          favorite={ favorite }
          type={ type }
        />);
      }
      return '';
    });
    return favoriteRecipe;
  }

  function renderDrink() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteRecipe = favoriteRecipes && favoriteRecipes.map((
      { type, id, image, name, area, alcoholicOrNot,
      }, index,
    ) => {
      if (type === 'bebida') {
        return (<RecipeDoneCard
          key={ Math.random() }
          image={ image }
          name={ name }
          index={ index - 1 }
          category={ alcoholicOrNot }
          area={ area }
          id={ id }
          setFavorite={ setFavorite }
          favorite={ favorite }
          type={ type }
        />);
      }
      return '';
    });
    return favoriteRecipe;
  }
  const renderFoods = buttonSelect === 'food' ? renderFood() : favorites;
  const renderDrinks = buttonSelect === 'drink' ? renderDrink() : favorites;
  return (
    <>
      <HeaderFoods hassearchbar={ false }>
        <h1 data-testid="page-title">Receitas Favoritas</h1>
      </HeaderFoods>
      <section>
        <button
          onClick={ handleButtonFilterName }
          name="all"
          data-testid="filter-by-all-btn"
          type="button"
        >
          All
        </button>
        <button
          onClick={ handleButtonFilterName }
          name="food"
          data-testid="filter-by-food-btn"
          type="button"
        >
          Food
        </button>
        <button
          onClick={ handleButtonFilterName }
          name="drink"
          data-testid="filter-by-drink-btn"
          type="button"
        >
          Drinks
        </button>
      </section>
      {buttonSelect === 'food' ? renderFoods : renderDrinks }
    </>
  );
}

export default FavoriteRecipes;
