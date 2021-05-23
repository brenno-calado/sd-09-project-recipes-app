import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components';
import { getItemLocalStorage } from '../services/localStorageService';
import { removeToFavorite } from '../services/functionsApi';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../css/FavoriteRecipes.css';

function FavoriteRecipes() {
  const [filter, setFilter] = useState('');
  const [copy, setCopy] = useState(false);
  const [focus, setFocus] = useState(true);
  const [itemRemoved, setItemRemoved] = useState(false);

  const data = localStorage.favoriteRecipes
    ? getItemLocalStorage('favoriteRecipes') : [];

  const handleClick = ({ target: { value } }) => {
    setFilter(value);
    setFocus(false);
  };

  const removeItem = (id) => {
    const milliseconds = 1000;
    removeToFavorite(id);
    setItemRemoved(true);
    setTimeout(() => setItemRemoved(false), milliseconds);
  };

  const share = (href) => {
    const { location: { origin } } = window;
    navigator.clipboard.writeText(`${origin}${href}`);
    setCopy(true);
  };

  const createButton = (testid, value, onClick) => (
    <button
      data-testid={ testid }
      value={ value }
      type="button"
      onClick={ onClick }
      className={ !value && focus ? 'all-btn button-filter' : 'button-filter' }
    >
      { value || 'All' }
    </button>
  );

  return (
    <section>
      <Header title="Receitas Favoritas" />
      <nav className="nav-filters-types">
        { createButton('filter-by-all-btn', '', handleClick) }
        { createButton('filter-by-food-btn', 'comida', handleClick) }
        { createButton('filter-by-drink-btn', 'bebida', handleClick) }
      </nav>
      { itemRemoved && <p>Item removido dos favoritos</p> }
      { data.filter(({ type }) => type.includes(filter)).map(
        (
          { id, type, area, category, alcoholicOrNot, name, image },
          index,
        ) => (
          <div key={ name } className="wrapper-recipe-item">
            <Link to={ `/${type}s/${id}` } key={ name } className="card-recipe">
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ image }
                alt={ name }
              />
              <div className="text-card-container">
                <div className="title-card-container">
                  <h3 data-testid={ `${index}-horizontal-name` }>{ name }</h3>
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    { type === 'comida' ? `${area} - ${category}` : alcoholicOrNot }
                  </p>
                </div>
                <p className="text-preview">Texto de apresentação da receita</p>
              </div>
            </Link>
            <div className="buttons-container-favorite">
              <button
                data-testid={ `${index}-horizontal-favorite-btn` }
                type="button"
                onClick={ () => removeItem(id) }
                src={ blackHeartIcon }
              >
                <img
                  src={ blackHeartIcon }
                  alt="favorite icon"
                />
              </button>
              <button
                data-testid={ `${index}-horizontal-share-btn` }
                type="button"
                src={ shareIcon }
                onClick={ () => share(`/${type}s/${id}`) }
              >
                <img src={ shareIcon } alt="Share Icon" />
              </button>
            </div>
          </div>
        ),
      ) }
      { copy && <span>Link copiado!</span> }
    </section>
  );
}

export default FavoriteRecipes;
