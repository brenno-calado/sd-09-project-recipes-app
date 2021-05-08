import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { saveAsFavorite } from '../services/details';
import { MyContext } from '../MyContext';

const FavoriteCard = (props) => {
  const { index, element } = props;
  const { data } = useContext(MyContext);
  const {
    id,
    type,
    category,
    alcoholicOrNot,
    image,
    name,
    area,
  } = element;
  const [isFavorite, setIsFavorite] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const saveFavorite = () => {
    setIsFavorite(!isFavorite);
    saveAsFavorite(id, data, type);
  };

  const copyToClipboard = () => {
    const url = `http://localhost:3000/${type}s/${id}`;
    navigator.clipboard.writeText(url);
    setIsCopied(true);
  };

  return (
    <div>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {type === 'comida' ? `${area} - ${category}` : alcoholicOrNot}
      </p>
      <Link to={ `/${type}s/${id}` }>
        <h1 data-testid={ `${index}-horizontal-name` }>
          { name }
        </h1>
      </Link>
      <Link to={ `/${type}s/${id}` }>
        <img
          className="recipe-image"
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
          width="100"
          height="100"
        />
      </Link>
      <button type="button" onClick={ copyToClipboard }>
        { isCopied ? 'Link copiado!' : <img
          src={ ShareIcon }
          data-testid={ `${index}-horizontal-share-btn` }
          alt="share-icon"
        />}
      </button>
      <button type="button" onClick={ saveFavorite }>
        <img
          type="button"
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="favorite icon"
        />
      </button>
    </div>
  );
};
FavoriteCard.propTypes = {
  index: PropTypes.number.isRequired,
  element: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
  })).isRequired,
};
export default FavoriteCard;
