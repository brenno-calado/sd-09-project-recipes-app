import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartImg from '../images/blackHeartIcon.svg';
// import whiteHeartImg from '../images/whiteHeartIcon.svg';
import { AppContext } from '../context/AppContext';

function Perfil() {
  const { removeFromFavorite, removeFromTheFavorites, xablau } = useContext(AppContext);
  let localData = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [linkShared, setLinkShared] = useState(false);
  const [filterName, setFilterName] = useState('');

  const shareLink = (id, type) => {
    if (type === 'meal') {
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
    removeFromTheFavorites(id);
  };

  const showFilteredMeal = () => (
    localData.filter((meal) => {
      switch (filterName) {
      case 'All':
        return localData;
      case 'Food':
        return meal.type === 'meal';
      case 'Drinks':
        return meal.type === 'drink';
      default:
        return localData;
      }
    })
  );

  let arrRecipes = filterName ? showFilteredMeal() : localData;

  useEffect(() => {
    localData = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(localData);
    arrRecipes = filterName ? showFilteredMeal() : localData;
  }, [xablau]);

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
          <div key={ recipe.name }>
            <p>{recipe.alcoholicOrNot}</p>
            <div>
              <Link
                to={
                  recipe.type === 'meal'
                    ? `/comidas/${recipe.id}` : `/bebidas/${recipe.id}`
                }
              >
                <img
                  src={ recipe.image }
                  alt=""
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
            </div>
            <h4 data-testid={ `${index}-horizontal-top-text` }>{ recipe.category }</h4>
            <Link
              to={
                recipe.type === 'meal'
                  ? `/comidas/${recipe.id}` : `/bebidas/${recipe.id}`
              }
            >
              <h1 data-testid={ `${index}-horizontal-name` }>
                { recipe.name }
              </h1>
            </Link>
            <p data-testid={ `${index}-horizontal-done-date` }>
              { recipe.doneDate }
            </p>
            <button
              type="button"
              onClick={ () => shareLink(recipe.id, recipe.type) }
              data-testid={ `${index}-horizontal-share-btn` }
            >
              <img src={ shareIcon } alt="compartilhar" />
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
              onClick={ () => handleFavoriteButton(recipe.id) }
            >
              <img src={ blackHeartImg } alt="Favoritas" />
            </button>
            { linkShared && <p>Link copiado!</p> }
            <p
              data-testid={ `${index}-${recipe.tags}-horizontal-tag` }
            >
              { recipe.tags }
            </p>
            <p
              data-testid={ `${index}-${recipe.type}-horizontal-tag` }
            >
              { recipe.type }
            </p>
          </div>
        ))
      }
    </div>

  );
}

export default Perfil;
