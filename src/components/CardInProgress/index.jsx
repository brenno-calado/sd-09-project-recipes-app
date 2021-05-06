import React from 'react';
import { arrayOf, string, func, bool, shape } from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Redirect } from 'react-router';
import useHandleClickUrl from '../../hooks/useHandleClickUrl';
import blackHeart from '../../images/blackHeartIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import useShouldRedirect from '../../hooks/useShoulRedirect';
import endRecipeButton from '../../utils/endRecipeButton';

function CardeInProgress({
  image,
  title,
  category,
  instructions,
  favorite,
  children,
  handleFavorite,
  id,
  match,
  area,
  tags,
  style,
  // state,
}) {
  const endRecipeParams = {
    id,
    match,
    area,
    tags,
    image,
    title,
    category,
    style,
  };

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
        style={ { position: 'fixed', bottom: 0 } }
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ () => { endRecipeButton(endRecipeParams); handleClickRedirect(); } }
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
  area: string,
  tags: string,
  style: string,
  match: shape(),
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
  area: '',
  tags: '',
  style: '',
  match: {},
};

export default CardeInProgress;
