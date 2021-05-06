import React from 'react';
import { arrayOf, string, func, bool } from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Redirect } from 'react-router';
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
  // id,
  // state,
}) {
  // const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [handleClickRedirect, shouldRedirect] = useShouldRedirect();
  const [copyUrl, handleClickUrl] = useHandleClickUrl();

  // useEffect(() => {
  //   const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   if (children.length === storage.cocktails[id].length) {
  //     setIsBtnDisabled(false);
  //   }
  // }, [children.length, id]);

  // useEffect(() => {
  //   console.log();
  //   const storageLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   if (storageLocal) {
  //     if (children.length === storageLocal.meals[id].length) {
  //       console.log('igual');
  //       setIsBtnDisabled(false);
  //     }
  //   }
  // }, [children.length, id, state]);

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
};

CardeInProgress.defaultProps = {
  image: '',
  title: '',
  category: '',
  instructions: '',
  children: [],
  handleFavorite: () => {},
  favorite: false,
};

export default CardeInProgress;