import React from 'react';
import { string, func, bool, number } from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import useHandleClickUrl from '../../hooks/useHandleClickUrl';

function RecipeDoneCard(
  { image, name, index, doneData, category,
    tagName, area, id, setFavorite, favorite, type },
) {
  const [copyUrl, handleClickUrl] = useHandleClickUrl();

  let url = window.location.href;
  url = url.replace('receitas-favoritas', `comidas/${id}`);

  function handleRemoveFavorite() {
    setFavorite(!favorite);
    if (localStorage && (favorite || !favorite)) {
      const repositoresLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const localStorageItem = repositoresLocal
        .filter(({ id: favoriteId }) => favoriteId !== id);
      localStorage.setItem('favoriteRecipes',
        JSON.stringify(localStorageItem));
    }
  }

  return (
    <li>
      <Link to={ `/${type}s/${id}` }>
        <img
          style={ { width: 250 } }
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ name }
        />
        <p data-testid={ `${index}-horizontal-name` }>{name}</p>
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>{`${area} - ${category}`}</p>
      <p data-testid={ `${index}-horizontal-done-date` }>{doneData}</p>
      <CopyToClipboard text={ url }>
        <button
          onClick={ () => { handleClickUrl(); } }
          type="button"
        >
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="Compartilhar"
          />
        </button>
      </CopyToClipboard>
      {copyUrl}
      <button
        onClick={ handleRemoveFavorite }
        type="button"
      >
        <img
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ blackHeartIcon }
          alt="Favorito"
        />
      </button>

      <p data-testid={ `${index}-${tagName}-horizontal-tag` }>
        {tagName}
      </p>
    </li>
  );
}

RecipeDoneCard.propTypes = {
  image: string,
  name: string,
  index: number,
  doneData: string,
  category: string,
  tagName: string,
  area: string,
  id: string,
  setFavorite: func,
  favorite: bool,
  type: string,
};

RecipeDoneCard.defaultProps = {
  image: '',
  name: '',
  index: 0,
  doneData: '',
  category: '',
  tagName: '',
  area: '',
  id: '',
  setFavorite: () => {},
  favorite: bool,
  type: '',
};

export default RecipeDoneCard;
