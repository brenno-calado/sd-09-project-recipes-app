import { string, arrayOf, shape, bool, func } from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import React, { useEffect } from 'react';
import blackHeart from '../../images/blackHeartIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import useHandleClickUrl from '../../hooks/useHandleClickUrl';
import { useRecipeContext } from '../../contexts/recipeContext';

function CardDetails({
  image, title, video, categoryText, instructions, type, id,
  shouldVideoApear, children, isAlcoholic, handleFavoriteClick, favorite }) {
  const [copyUrl, handleClickUrl] = useHandleClickUrl();
  const { setBtnText } = useRecipeContext();

  const url = window.location.href;

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storage && storage[type] && storage[type][id]
        && (storage[type][id].length > 0)) {
      setBtnText('Continuar Receita');
    }
  }, [children.length, id, type, setBtnText]);

  return (
    <li>
      <img
        width="340px"
        src={ image }
        data-testid="recipe-photo"
        alt={ title }
      />
      <h2 data-testid="recipe-title">{ title }</h2>
      {!shouldVideoApear && <p data-testid="recipe-category">{isAlcoholic}</p>}
      <CopyToClipboard text={ url }>
        <button
          onClick={ handleClickUrl }
          data-testid="share-btn"
          type="button"
        >
          Compartilhar
        </button>
      </CopyToClipboard>
      {copyUrl}
      <button type="button" onClick={ handleFavoriteClick }>
        <img
          data-testid="favorite-btn"
          src={ favorite ? blackHeart : whiteHeart }
          alt="Favoritar"
        />
      </button>

      <p data-testid="recipe-category">{ categoryText }</p>

      <ul>
        {children}
      </ul>

      <p data-testid="instructions">{ instructions }</p>

      { shouldVideoApear && (
        <iframe
          title={ title }
          width="300"
          height="300"
          src={ video }
          data-testid="video"
        />
      )}
    </li>
  );
}

CardDetails.propTypes = {
  image: string,
  title: string,
  categoryText: string,
  video: string,
  instructions: string,
  isAlcoholic: string,
  children: arrayOf(shape()),
  shouldVideoApear: bool,
  handleFavoriteClick: func,
  favorite: bool,
  type: string,
  id: string,
};

CardDetails.defaultProps = {
  image: '',
  title: '',
  categoryText: '',
  video: '',
  instructions: '',
  isAlcoholic: '',
  children: [],
  shouldVideoApear: bool,
  handleFavoriteClick: () => {},
  favorite: bool,
  type: '',
  id: '',
};

export default CardDetails;
