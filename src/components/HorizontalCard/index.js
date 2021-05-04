import React, { useState } from 'react';
import PropTypes, { string } from 'prop-types';
import { Link } from 'react-router-dom';
import share from '../../images/shareIcon.svg';
import './style.css';

const copy = require('clipboard-copy');

const HorizontalCard = ({ index, doneRecipe }) => {
  const [copied, setCopied] = useState(false);
  const URL = doneRecipe.type === 'comida' ? `${window.location.origin}/comidas`
    : `${window.location.origin}/bebidas`;

  const copyLink = () => {
    setCopied(!copied);
    copy(`${URL}/${doneRecipe.id}`);
  };

  return (
    <article className="horizontal-card silver-shadow">
      <Link to={ `/${doneRecipe.type}s/${doneRecipe.id}` }>
        <img
          src={ doneRecipe.image }
          alt={ doneRecipe.name }
          width="120px"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <section className="card-text">
        <span data-testid={ `${index}-horizontal-top-text` }>
          {`${doneRecipe.area} - ${doneRecipe.category} ${doneRecipe.alcoholicOrNot}`}
        </span>
        <Link to={ `/${doneRecipe.type}s/${doneRecipe.id}` }>
          <span className="bold" data-testid={ `${index}-horizontal-name` }>
            {doneRecipe.name}
          </span>
        </Link>
        <div>
          <button
            src={ share }
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => copyLink() }
            className="share-btn"
          >
            <img src={ share } alt={ share } width="20px" />
          </button>
          { !copied ? null : <span className="copied">Link copiado!</span>}
        </div>
        <span className="bold" data-testid={ `${index}-horizontal-done-date` }>
          {`Made in ${doneRecipe.doneDate}`}
        </span>
        { doneRecipe.tags.length === 0 ? null
          : doneRecipe.tags.map((tagName) => (
            <span
              key={ index }
              data-testid={ `${index}-${tagName}-horizontal-tag` }
              className="tag"
            >
              {tagName}
            </span>))}
      </section>
    </article>
  );
};

HorizontalCard.propTypes = {
  index: PropTypes.number.isRequired,
  doneRecipe: PropTypes.shape({
    alcoholicOrNot: string.isRequired,
    area: string.isRequired,
    category: string.isRequired,
    doneDate: string.isRequired,
    id: string.isRequired,
    image: string.isRequired,
    name: string.isRequired,
    tags: PropTypes.arrayOf(string).isRequired,
    type: string.isRequired,
  }).isRequired,
};

export default HorizontalCard;
