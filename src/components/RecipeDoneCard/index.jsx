import React from 'react';
import { string, func, bool, number } from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import { Media } from 'react-bootstrap';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import useHandleClickUrl from '../../hooks/useHandleClickUrl';
import styles from './recipeCardsDone.module.css';

function RecipeDoneCard(
  { image, name, index, doneData, category,
    tagName, area, id, setFavorite, favorite,
    type, doneDate, shouldFavorite, alcoholicOrNot },
) {
  const [copyUrl, handleClickUrl] = useHandleClickUrl();

  let url = window.location.href;
  if (url === 'http://localhost:3000/receitas-favoritas') {
    url = url.replace('receitas-favoritas', `${type}s/${id}`);
  } else if (url === 'http://localhost:3000/receitas-feitas') {
    url = url.replace('receitas-feitas', `${type}s/${id}`);
  }

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
    <Media style={ { padding: '8px' } }>
      <Link to={ `/${type}s/${id}` }>
        <img
          width={ 130 }
          height={ 190 }
          className="mr-3"
          style={ { objectFit: 'cover' } }
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ name }
        />
      </Link>
      <Media.Body style={ { overflow: 'auto' } }>
        <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>

        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          {category.length > 0 && `${area}  ${category}`}

        </p>
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          { area.length > 0 && `${area}  ${alcoholicOrNot}`}
        </p>
        <p data-testid={ `${index}-horizontal-done-date` }>{doneData}</p>
        <CopyToClipboard text={ url }>
          <button
            className={ styles.btn }
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
        { shouldFavorite && (
          <button
            className={ styles.btn }
            onClick={ handleRemoveFavorite }
            type="button"
          >
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt="Favorito"
            />
          </button>
        ) }
        { tagName && tagName.map((item) => (
          <p data-testid={ `${0}-${item}-horizontal-tag` } key={ Math.random() }>
            {item}
          </p>
        )) }
        <p
          data-testid={ `${index}-horizontal-done-date` }
        >
          {`Feita em: ${doneDate}`}
        </p>
      </Media.Body>
    </Media>
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
  doneDate: string,
  shouldFavorite: bool,
  alcoholicOrNot: string,
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
  doneDate: '',
  shouldFavorite: true,
  alcoholicOrNot: '',
};

export default RecipeDoneCard;
