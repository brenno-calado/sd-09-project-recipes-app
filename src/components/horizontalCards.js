import React from 'react';
import { arrayOf } from 'prop-types';
import { Link } from 'react-router-dom';
import ShareButton from './shareButton';

export default function HorizontalCards({ arrayOfRecipes }) {
  const { origin } = window.location;

  const generateTags = (arrayOfTags, index) => arrayOfTags.map((tag) => (
    <span
      key={ `${tag}${index}` }
      data-testid={ `${index}-${tag}-horizontal-tag` }
    >
      {tag}
    </span>));

  return (
    <div className="horizontal-cards-container">
      { arrayOfRecipes.map((item, index) => (
        <div className="horizontal-card" key={ item.id }>
          <div className="image-card-container">
            <Link to={ `/${item.type}s/${item.id}` }>
              <img
                src={ item.image }
                data-testid={ `${index}-horizontal-image` }
                alt=""
                className="horizontal-card-img"
              />
            </Link>
          </div>
          <section className="card-text-container">
            <div>
              <div
                data-testid={ `${index}-horizontal-top-text` }
                className="card-category"
              >
                {item.alcoholicOrNot
                  ? `${item.alcoholicOrNot}` : `${item.area} - ${item.category}`}
              </div>
            </div>
            <div>
              <Link to={ `/${item.type}s/${item.id}` }>
                <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
              </Link>
              <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>
            </div>
            <div className="card-btns-container">
              <ShareButton
                datatestid={ `${index}-horizontal-share-btn` }
                url={ `${origin}/${item.type}s/${item.id}` }
              />
              { !item.tags
                ? <div data-testid={ `${index}-horizontal-favorite-btn` }>S2</div> : '' }
            </div>
            <div className="card-tags-container">
              { item.tags && generateTags(item.tags, index) }
            </div>
          </section>
        </div>
      )) }
    </div>
  );
}

HorizontalCards.propTypes = {
  arrayOfRecipes: arrayOf(Object).isRequired,
};
