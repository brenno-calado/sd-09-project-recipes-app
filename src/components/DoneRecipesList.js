import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const DoneRecipesList = ({ recipe, index }) => {
  const [copied, setCopied] = useState(false);
  const copyLink = (id, type) => {
    if (type === 'bebida') {
      copy(`http://localhost:3000/bebidas/${id}`);
      setCopied(true);
    } else {
      copy(`http://localhost:3000/comidas/${id}`);
      setCopied(true);
    }
  };

  const { id, type, area, category, alcoholicOrNot, name,
    image, doneDate, tags } = recipe;

  return (
    <div data-testid={ `${index}-recipe-card` }>
      {type === 'bebida' ? (
        <Link to={ `/bebidas/${id}` }>
          <img
            style={ { width: '100px' } }
            data-testid={ `${index}-horizontal-image` }
            src={ image }
            alt={ name }
          />
        </Link>
      ) : (
        <Link to={ `/comidas/${id}` }>
          <img
            style={ { width: '100px' } }
            data-testid={ `${index}-horizontal-image` }
            src={ image }
            alt={ name }
          />
        </Link>
      )}
      {type === 'bebida' ? (
        <Link
          to={ `/bebidas/${id}` }
          data-testid={ `${index}-horizontal-name` }
        >
          { name }
        </Link>
      ) : (
        <Link
          to={ `/comidas/${id}` }
          data-testid={ `${index}-horizontal-name` }
        >
          { name }
        </Link>
      )}
      {type === 'bebida' ? (
        <p data-testid={ `${index}-horizontal-top-text` }>
          { alcoholicOrNot }
        </p>
      ) : (
        <p data-testid={ `${index}-horizontal-top-text` }>
          {`${area} - ${category}`}
        </p>
      ) }
      <p data-testid={ `${index}-horizontal-done-date` }>
        Feito em:
        { doneDate }
      </p>
      <button
        type="button"
        onClick={ () => copyLink(id, type) }
      >
        {copied ? <span>Link copiado!</span> : <img
          src={ shareIcon }
          data-testid={ `${index}-horizontal-share-btn` }
          alt="Compartilhar receita"
        /> }
      </button>
      {tags.map((tag) => (
        <p key={ index + tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
          {tag}
        </p>
      ))}
    </div>
  );
};

DoneRecipesList.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default DoneRecipesList;
