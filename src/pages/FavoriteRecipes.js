import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components';
import { getItemLocalStorage } from '../services/localStorageService';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [filter, setFilter] = useState('');
  const [copy, setCopy] = useState(false);

  const data = localStorage.favoriteRecipes ? getItemLocalStorage('favoriteRecipes') : [];

  const createButton = (testid, value, onClick) => (
    <button data-testid={ testid } value={ value } type="button" onClick={ onClick }>
      { value || 'All' }
    </button>
  );

  const handleClick = ({ target: { value } }) => setFilter(value);

  const share = (href) => {
    const { location: { origin } } = window;
    navigator.clipboard.writeText(`${origin}${href}`);
    setCopy(true);
  };

  return (
    <section>
      <Header title="Receitas Favoritas" />
      { createButton('filter-by-all-btn', '', handleClick) }
      { createButton('filter-by-food-btn', 'comida', handleClick) }
      { createButton('filter-by-drink-btn', 'bebida', handleClick) }
      { data.filter(({ type }) => type.includes(filter)).map(
        (
          { id, type, area, category, alcoholicOrNot, name, image },
          index,
        ) => (
          <div key={ name }>
            <Link to={ `/${type}s/${id}` } key={ name }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ image }
                alt={ name }
              />
              <p data-testid={ `${index}-horizontal-top-text` }>
                { type === 'comida' ? `${area} - ${category}` : alcoholicOrNot }
              </p>
              <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
            </Link>
            <button
              data-testid={ `${index}-horizontal-share-btn` }
              type="button"
              src={ shareIcon }
              onClick={ () => share(`/${type}s/${id}`) }
            >
              <img src={ shareIcon } alt="Share Icon" />
            </button>
            <button
              data-testid={ `${index}-horizontal-favorite-btn` }
              type="button"
              src={ !data ? whiteHeartIcon : blackHeartIcon }
              // onClick={}
            >
              <img src={ shareIcon } alt="Favorite Icon" />
            </button>
          </div>
        ),
      ) }
      { copy && <span>Link copiado!</span> }
    </section>
  );
}

export default FavoriteRecipes;
