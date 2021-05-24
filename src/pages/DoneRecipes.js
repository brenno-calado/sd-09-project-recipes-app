import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components';
import { getItemLocalStorage } from '../services/localStorageService';
import shareIcon from '../images/shareIcon.svg';
import '../css/DoneRecipes.css';

function DoneRecipes() {
  const [filter, setFilter] = useState('');
  const [copy, setCopy] = useState(false);
  const [focus, setFocus] = useState(true);

  const data = localStorage.doneRecipes ? getItemLocalStorage('doneRecipes') : [];

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

  const handleClick = ({ target: { value } }) => {
    setFilter(value);
    setFocus(false);
  };

  const share = (href) => {
    const { location: { origin } } = window;
    navigator.clipboard.writeText(`${origin}${href}`);
    setCopy(true);
  };

  return (
    <section>
      <Header title="Receitas Feitas" />
      <nav className="nav-filters-types">
        { createButton('filter-by-all-btn', '', handleClick) }
        { createButton('filter-by-food-btn', 'comida', handleClick) }
        { createButton('filter-by-drink-btn', 'bebida', handleClick) }
      </nav>
      { data.filter(({ type }) => type.includes(filter)).map(
        (
          { id, type, area, category, alcoholicOrNot, name, image, doneDate, tags },
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
                <p
                  className="text-preview"
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  { doneDate }
                </p>
                { tags.map((tag) => (
                  <span
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                    key={ tag }
                    className="tag-box"
                  >
                    { tag }
                  </span>
                ))}
              </div>
            </Link>
            <div className="buttons-container-favorite">
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

export default DoneRecipes;
