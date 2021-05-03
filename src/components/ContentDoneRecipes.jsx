import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Alert from 'react-bootstrap/Alert';

import shareIcon from '../images/shareIcon.svg';
import '../css/components/ContentDoneRecipes.css';

function ContentDoneRecipes({ recipes, recipeIndex }) {
  const [show, setShow] = useState(false);

  const {
    id,
    area,
    category,
    type,
    alcoholicOrNot,
    name,
    image,
    doneDate,
    tags,
  } = recipes;
  const filteredTags = tags.filter((_, index) => index < 2);

  const handleShareIconClick = (recipeType, recipeId) => {
    const baseURL = 'http://localhost:3000/';
    copy(`${baseURL}${recipeType}s/${recipeId}`);
    setShow(true);
  };

  const alert = (
    <Alert variant="success" onClose={ () => setShow(false) } dismissible>
      <Alert.Heading>Link copiado!</Alert.Heading>
    </Alert>
  );

  return (
    <div className="done-recipes-card">
      <Link to={ type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}` }>
        <img
          className="thumbnail"
          src={ image }
          alt={ name }
          data-testid={ `${recipeIndex}-horizontal-image` }
        />
      </Link>
      <section>
        {show && alert}
        <div>
          <div data-testid={ `${recipeIndex}-horizontal-top-text` }>
            {type === 'comida' ? `${area} - ${category}` : alcoholicOrNot}
          </div>
          <button type="button" onClick={ () => handleShareIconClick(type, id) }>
            <img
              data-testid={ `${recipeIndex}-horizontal-share-btn` }
              src={ shareIcon }
              alt="Share Icon"
            />
          </button>
        </div>
        <Link to={ type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}` }>
          <h4 data-testid={ `${recipeIndex}-horizontal-name` }>{ name }</h4>
        </Link>
        <span data-testid={ `${recipeIndex}-horizontal-done-date` }>
          { `Feita em: ${doneDate}` }
        </span>
        <div>
          {filteredTags.map((tagName) => (
            <span
              data-testid={ `${recipeIndex}-${tagName}-horizontal-tag` }
              key={ tagName }
              className="done-recipes-tags"
            >
              { tagName }
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

ContentDoneRecipes.propTypes = {
  recipes: PropTypes.arrayOf(Object).isRequired,
  recipeIndex: PropTypes.number.isRequired,
};

export default ContentDoneRecipes;
