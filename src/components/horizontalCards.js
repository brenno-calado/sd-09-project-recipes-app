import React from 'react';
import { arrayOf } from 'prop-types';

export default function HorizontalCards({ arrayOfRecipes }) {
  console.log(arrayOfRecipes);

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
            <img
              src={ item.image }
              data-testid={ `${index}-horizontal-image` }
              alt=""
              className="horizontal-card-img"
            />
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
              <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
              <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>
            </div>
            <div className="card-btns-container">
              <div
                data-testid={ `${index}-horizontal-share-btn` }
                className="share"
              >
                shareBtn
              </div>
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
