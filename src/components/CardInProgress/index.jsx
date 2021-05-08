import React, { useEffect, useState } from 'react';
import { arrayOf, string, func, bool } from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import useHandleClickUrl from '../../hooks/useHandleClickUrl';
import blackHeart from '../../images/blackHeartIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import useShouldRedirect from '../../hooks/useShoulRedirect';

function CardeInProgress({
  image,
  title,
  category,
  instructions,
  favorite,
  children,
  handleFavorite,
  id,
  type,
  inputState,
}) {
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [handleClickRedirect, shouldRedirect] = useShouldRedirect();
  const [copyUrl, handleClickUrl] = useHandleClickUrl();

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storage && storage[type] && storage[type][id]
        && (children.length === storage[type][id].length)) {
      setIsBtnDisabled(false);
    }
  }, [children, id, type, inputState]);

  console.log(inputState);
  if (shouldRedirect) return <Redirect to="/receitas-feitas" />;

  let url = window.location.href;
  url = url.replace('/in-progress', '');

  return (
    <li>
      <img data-testid="recipe-photo" src={ image } alt={ title } />
      <h2 data-testid="recipe-title">{title}</h2>
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
      <button onClick={ handleFavorite } type="button">
        <img
          data-testid="favorite-btn"
          src={ favorite ? blackHeart : whiteHeart }
          alt="Favoritar"
        />
      </button>
      <p data-testid="recipe-category">{category}</p>
      <ul>
        {children}
      </ul>
      <p data-testid="instructions">{instructions}</p>
      <button
        onClick={ handleClickRedirect }
        style={ { position: 'fixed', bottom: 0 } }
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ isBtnDisabled }
      >
        Finalizar receita
      </button>
    </li>
  );
}

CardeInProgress.propTypes = {
  image: string,
  title: string,
  category: string,
  instructions: string,
  children: arrayOf(Object),
  handleFavorite: func,
  favorite: bool,
  id: string,
  type: string,
  inputState: string,
};

CardeInProgress.defaultProps = {
  image: '',
  title: '',
  category: '',
  instructions: '',
  children: [],
  handleFavorite: () => {},
  favorite: false,
  id: '',
  type: '',
  inputState: '',
};

const mapStateToProps = (state) => ({
  inputState: state.inputReducer.checked,
});

export default connect(mapStateToProps)(CardeInProgress);
