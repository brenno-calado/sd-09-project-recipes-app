import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components';
import { getItemLocalStorage } from '../services/localStorageService';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [filter, setFilter] = useState('');
  const [copy, setCopy] = useState(false);

  const data = localStorage.doneRecipes ? getItemLocalStorage('doneRecipes') : [];

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
      <Header title="Receitas Feitas" />
      { createButton('filter-by-all-btn', '', handleClick) }
      { createButton('filter-by-food-btn', 'comida', handleClick) }
      { createButton('filter-by-drink-btn', 'bebida', handleClick) }
      { data.filter(({ type }) => type.includes(filter)).map(
        (
          { id, type, area, category, alcoholicOrNot, name, image, doneDate, tags },
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
            <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
            <button
              data-testid={ `${index}-horizontal-share-btn` }
              type="button"
              src={ shareIcon }
              onClick={ () => share(`/${type}s/${id}`) }
            >
              <img src={ shareIcon } alt="Share Icon" />
            </button>
            { tags.map((tag) => (
              <p data-testid={ `${index}-${tag}-horizontal-tag` } key={ tag }>{ tag }</p>
            ))}
          </div>
        ),
      ) }
      { copy && <span>Link copiado!</span> }
    </section>
  );
}

export default DoneRecipes;
