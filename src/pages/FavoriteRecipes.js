import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../css/FavoriteRecipes.css';

const FavoriteRecipes = () => {
  const [myFavoriteList, setMyFavoriteList] = useState([]);
  const [myFilteredList, setMyFilteredList] = useState([]);
  const [reloadAssist, setRealoadAssist] = useState(false);

  const loadFavoriteList = () => {
    const myList = (JSON.parse(localStorage.getItem('favoriteRecipes')))
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
    setMyFavoriteList(myList);
    setMyFilteredList(myList);
  };

  const [shareButton, setShareButton] = useState(false);

  const clickShare = ({ target }) => {
    const { alt } = target;
    setShareButton(true);
    const myPath = `http://localhost:3000${alt}`;
    navigator.clipboard.writeText(myPath);
  };

  const clickFavorite = ({ target }) => {
    const id = target.alt;
    const newFavoriteList = myFavoriteList.filter((item) => item.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteList));
    setMyFavoriteList(newFavoriteList);
    setRealoadAssist(!reloadAssist);
  };

  const handleClickFilter = ({ target }) => {
    const { innerText } = target;
    if (innerText === 'All') {
      setMyFilteredList(myFavoriteList);
    }
    if (innerText === 'Food') {
      setMyFilteredList(myFavoriteList.filter((item) => item.type === 'comida'));
    }
    if (innerText === 'Drinks') {
      setMyFilteredList(myFavoriteList.filter((item) => item.type === 'bebida'));
    }
  };

  useEffect(() => {
    loadFavoriteList();
  }, [reloadAssist]);

  return (
    <div className="favorite-recipes-container">
      <Header title="Receitas Favoritas" />
      <div className="filter-button-container-favorite">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleClickFilter }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ handleClickFilter }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleClickFilter }
        >
          Drinks
        </button>
      </div>
      { shareButton ? <span>Link copiado!</span> : null }
      {myFilteredList.map(
        ({ id, image, type, name, category, area, alcoholicOrNot }, index) => (
          type === 'comida'
            ? (
              <div key={ index } className="favorite-recipe-card">
                <Link to={ `/comidas/${id}` }>
                  <img
                    src={ image }
                    alt="comida"
                    data-testid={ `${index}-horizontal-image` }
                    className="favorite-recipe-img"
                  />
                </Link>
                <div className="itens-favorite-recipe-card">
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { `${area} - ${category}` }
                  </p>
                  <Link to={ `/comidas/${id}` }>
                    <p
                      data-testid={ `${index}-horizontal-name` }
                    >
                      { name }
                    </p>
                  </Link>
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
                    <button
                      type="button"
                      onClick={ clickFavorite }
                    >
                      <img
                        data-testid={ `${index}-horizontal-favorite-btn` }
                        src={ blackHeartIcon }
                        alt={ id }
                      />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div key={ index } className="favorite-recipe-card">
                <Link to={ `/bebidas/${id}` }>
                  <img
                    src={ image }
                    alt="bebida"
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>
                <div className="itens-favorite-recipe-card">
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { alcoholicOrNot }
                  </p>
                  <Link to={ `/bebidas/${id}` }>
                    <p
                      data-testid={ `${index}-horizontal-name` }
                    >
                      { name }
                    </p>
                  </Link>
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
                    <button
                      type="button"
                      onClick={ clickFavorite }
                    >
                      <img
                        data-testid={ `${index}-horizontal-favorite-btn` }
                        src={ blackHeartIcon }
                        alt={ id }
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
