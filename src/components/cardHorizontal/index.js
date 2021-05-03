import React from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import { copyClipboard, resetSpanShare } from '../../services/clipboardCopy';
import './cardHorizontal.css';

function index({ recipe, indexCard }) {
  const {
    id, image, type, category, alcoholicOrNot, area, name, doneDate, tags,
  } = recipe;

  return (
    <div className="container-cardHorizontal">
      <Link to={ `/${type}s/${id}` }>
        <img
          className="img-main-cardHorizontal"
          src={ image }
          alt="item"
          data-testid={ `${indexCard}-horizontal-image` }
        />
      </Link>
      <div className="container-info-cardHorizontal">
        <div className="container-topText-cardHorizontal">
          {
            (type === 'bebida')
              ? (
                <p
                  className="top-text-cardHorizontal"
                  data-testid={ `${indexCard}-horizontal-top-text` }
                >
                  { `${alcoholicOrNot}` }
                </p>)
              : (
                <p
                  className="top-text-cardHorizontal"
                  data-testid={ `${indexCard}-horizontal-top-text` }
                >
                  { `${area} - ${category}` }
                </p>)
          }
          <button
            className="btn-share-cardHorizontal"
            type="button"
            onClick={ () => copyClipboard(type, id) }
            onMouseOut={ () => resetSpanShare(id) }
            onBlur={ () => {} }
          >
            <img
              data-testid={ `${indexCard}-horizontal-share-btn` }
              src={ shareIcon }
              alt="shareIcon"
            />
            <span id={ `spanShare${id}` } className="tooltip-text">Copia URL</span>
          </button>
        </div>
        <Link to={ `/${type}s/${id}` }>
          <h4
            className="name-cardHorizontal"
            data-testid={ `${indexCard}-horizontal-name` }
          >
            { name }
          </h4>
        </Link>
        <div className="container-done-cardHorizontal">
          <p className="text-done">Feita em :</p>
          <p className="text-done" data-testid={ `${indexCard}-horizontal-done-date` }>
            { doneDate }
          </p>
        </div>
        <div className="conatiner-tags-cardHorizontal">
          {
            (type === 'comida')
            && tags.map((tag) => (
              <p key={ indexCard } data-testid={ `${indexCard}-${tag}-horizontal-tag` }>
                {tag}
              </p>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default index;
