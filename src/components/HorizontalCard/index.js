import React, { useState } from 'react';
import PropTypes, { string } from 'prop-types';
import { Link } from 'react-router-dom';
import share from '../../images/shareIcon.svg';
// import whiteHeart from '../../images/whiteHeartIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

const HorizontalCard = ({ index, recipe, removeFav }) => {
  const [copied, setCopied] = useState(false);
  const URL = recipe.type === 'comida' ? `${window.location.origin}/comidas`
    : `${window.location.origin}/bebidas`;

  const favObjectLength = 7;

  const copyLink = () => {
    setCopied(!copied);
    copy(`${URL}/${recipe.id}`);
  };

  const doneCard = () => (
    <>
      <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
      { !recipe.tags ? null
        : recipe.tags.map((tagName) => (
          <span key={ tagName } data-testid={ `${index}-${tagName}-horizontal-tag` }>
            {tagName}
          </span>))}
    </>
  );

  const favCard = () => (
    <button
      src={ blackHeart }
      type="button"
      data-testid={ `${index}-horizontal-favorite-btn` }
      onClick={ () => removeFav(index) }
    >
      <img src={ blackHeart } alt={ blackHeart } />
    </button>
  );

  return (
    <article className="horizontal-card">
      <Link to={ `/${recipe.type}s/${recipe.id}` }>
        <img
          src={ recipe.image }
          alt={ recipe.name }
          width="40%"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <section>
        <p data-testid={ `${index}-horizontal-top-text` }>
          {`${recipe.area} - ${recipe.category} ${recipe.alcoholicOrNot}`}
        </p>
        <Link to={ `/${recipe.type}s/${recipe.id}` }>
          <h4 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h4>
        </Link>
        <button
          src={ share }
          type="button"
          data-testid={ `${index}-horizontal-share-btn` }
          onClick={ () => copyLink() }
        >
          <img src={ share } alt={ share } width="20px" />
        </button>
        { !copied ? null : <span>Link copiado!</span>}
        { Object.keys(recipe).length === favObjectLength ? favCard() : doneCard()}
      </section>
    </article>
  );
};

HorizontalCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    alcoholicOrNot: string.isRequired,
    area: string.isRequired,
    category: string.isRequired,
    doneDate: string,
    id: string.isRequired,
    image: string.isRequired,
    name: string.isRequired,
    tags: PropTypes.arrayOf(string),
    type: string.isRequired,
  }),
  removeFav: PropTypes.func,
};

HorizontalCard.defaultProps = {
  recipe: {
    doneDate: 'asd',
    tags: undefined,
  },
  removeFav: undefined,
};

export default HorizontalCard;
