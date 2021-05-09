import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes, { string } from 'prop-types';
import ShareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { saveAsFavorite } from '../services/details';
import { MyContext } from '../MyContext';

const DoneCard = (props) => {
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
    doneDate,
    tags,
  } = element;
  const [isFavorite, setIsFavorite] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const checkFavoriteRecipes = () => localStorage.getItem('favoriteRecipes');
    if (checkFavoriteRecipes() !== null) {
      const getFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const initialFavoriteState = getFavorite.some((recipe) => recipe.id === id);
      setIsFavorite(initialFavoriteState);
    }
  }, [setIsFavorite, id]);
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
      { tags
        .map((item) => (
          <p data-testid={ `${0}-${item}-horizontal-tag` } key={ Math.random() }>
            {item}
          </p>
        )) }
      <p
        data-testid={ `${index}-horizontal-done-date` }
      >
        {`Feita em: ${doneDate}`}
      </p>
    </div>
  );
};
DoneCard.propTypes = {
  index: PropTypes.number.isRequired,
  element: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    doneDate: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(string).isRequired,
    map: PropTypes.func.isRequired,
  })).isRequired,
};
export default DoneCard;
