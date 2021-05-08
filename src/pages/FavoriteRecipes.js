import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import HeaderFoods from '../components/HeaderFoods';
import RecipeDoneCard from '../components/RecipeDoneCard';
import renderDrink from '../utils/renderDrink';
import renderFood from '../utils/renderFood';

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
          shouldFavorite
        />);
      }
      return '';
    });
    setFavorites(favoriteRecipe);
  }, [favorite]);

  function handleButtonFilterName({ target }) {
    const { name } = target;
    setButtonSelect(name);
  }

  const renderFoods = buttonSelect === 'food'
    ? renderFood(favorite, setFavorite) : favorites;
  const renderDrinks = buttonSelect === 'drink'
    ? renderDrink(favorite, setFavorite) : favorites;
  return (
    <>
      <HeaderFoods hassearchbar={ false }>
        <h1 data-testid="page-title">Receitas Favoritas</h1>
      </HeaderFoods>
      <section>
        <Button
          onClick={ handleButtonFilterName }
          name="all"
          data-testid="filter-by-all-btn"
          type="button"
        >
          All
        </Button>
        <Button
          onClick={ handleButtonFilterName }
          name="food"
          data-testid="filter-by-food-btn"
          type="button"
        >
          Food
        </Button>
        <Button
          onClick={ handleButtonFilterName }
          name="drink"
          data-testid="filter-by-drink-btn"
          type="button"
        >
          Drinks
        </Button>
      </section>
      {buttonSelect === 'food' ? renderFoods : renderDrinks }
    </>
  );
}

export default FavoriteRecipes;
