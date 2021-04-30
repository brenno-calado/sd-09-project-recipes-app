import React from 'react';
import { Link } from 'react-router-dom';
import { favoriteButton } from '../services/functions';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import ShareButton from './ShareButton';

function RenderFavFoods({ data, index, setData }) {
  function renderElements(element) {
    console.log(data);
    const { image, category, name, area, id, type } = element;
    return (
      <div>
        <Link to={ `/${type}s/${id}` }>
          <img
            src={ image }
            alt="thumb"
            width="200px"
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          { `${area} - ${category}` }
        </p>
        <Link to={ `/${type}s/${id}` }>
          <h3 data-testid={ `${index}-horizontal-name` }>{ name }</h3>
        </Link>
        <p>{ area }</p>
        <ShareButton
          dataTestId={ `${index}-horizontal-share-btn` }
          urlCopied={ `http://localhost:3000/comidas/${id}` }
        />
        <button
          type="button"
          src={ blackHeartIcon }
          onClick={ () => favoriteButton(id, setData) }
        >
          <img
            src={ blackHeartIcon }
            alt="favorite"
            data-testid={ `${index}-horizontal-favorite-btn` }
          />
        </button>
      </div>
    );
  }

  return renderElements(data);
}

export default RenderFavFoods;
