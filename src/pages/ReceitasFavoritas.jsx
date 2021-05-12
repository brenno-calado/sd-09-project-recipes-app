import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Share from '../components/Share';
import isFavIcon from '../images/blackHeartIcon.svg';
import '../styles/recipes.css';

function ReceitasFavoritas() {
  const [favs, setFavs] = useState(JSON.parse(localStorage.getItem('favoriteRecipes')));

  const recipeType = (index, area, category, alcohol) => {
    if (alcohol === '') {
      return (
        <h4 data-testid={ `${index}-horizontal-top-text` }>{`${area} - ${category}`}</h4>
      );
    }
    return (
      <h4 data-testid={ `${index}-horizontal-top-text` }>{ alcohol }</h4>
    );
  };

  // const favoriteRemove = (recipe) => {
  //   const updatedFav = favs;
  //   const index = updatedFav.findIndex((item) => item.id === recipe.id);
  //   updatedFav.splice(index, 1);
  //   localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFav));
  //   setFavs(updatedFav);
  // };

  const filterAll = () => {
    setFavs(JSON.parse(localStorage.getItem('favoriteRecipes')));
  };

  const filterFood = () => {
    const filteredRecipes = favs.filter((recipe) => recipe.alcoholicOrNot === '');
    setFavs(filteredRecipes);
  };

  const filterDrink = () => {
    const filteredRecipes = favs.filter((recipe) => recipe.alcoholicOrNot !== '');
    setFavs(filteredRecipes);
  };

  // useEffect(() => {
  //   setFavs(JSON.parse(localStorage.getItem('favoriteRecipes')));
  // }, []);

  if (!favs) return <div>loading</div>;

  return (
    <div>
      <Header textProp="Receitas Favoritas" />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ filterAll }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ filterFood }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ filterDrink }
        >
          Drink
        </button>
      </div>
      {favs.map((item, index) => (
        <div key={ Math.random() }>
          <img
            src={ item.image }
            alt="Recipe"
            data-testid={ `${index}-horizontal-image` }
          />
          {recipeType(index, item.area, item.category, item.alcoholicOrNot)}
          <h3 data-testid={ `${index}-horizontal-name` }>{ item.name }</h3>
          <div data-testid={ `${index}-horizontal-share-btn` }>
            <Share />
          </div>
          <button
            data-testid={ `${index}-horizontal-favorite-btn` }
            type="button"
            // onClick={ () => favoriteRemove(item) }
          >
            <img
              data-testid="favorite-btn"
              src={ isFavIcon }
              alt="Favorite"
            />
          </button>
        </div>
      ))}
    </div>
  );
}

export default ReceitasFavoritas;
