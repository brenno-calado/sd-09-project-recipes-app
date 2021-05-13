import React, { useEffect, useState } from 'react';
import { arrayOf, string, func, bool, shape } from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Button, Card } from 'react-bootstrap';
import useHandleClickUrl from '../../hooks/useHandleClickUrl';
import blackHeart from '../../images/blackHeartIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import shareIcons from '../../images/shareIcon.svg';
import useShouldRedirect from '../../hooks/useShoulRedirect';
import endRecipeButton from '../../utils/endRecipeButton';
import styles from './cardInProgress.module.css';

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
  match,
  area,
  tags,
  style,
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

  if (shouldRedirect) return <Redirect to="/receitas-feitas" />;

  let url = window.location.href;
  url = url.replace('/in-progress', '');

  return (

    <Card className={ styles.cardContainer }>
      <Card.Img
        className={ styles.cardImage }
        data-testid="recipe-photo"
        src={ image }
        alt={ title }
      />
      <h1
        className={ styles.cardTitle }
        data-testid="recipe-title"
      >
        {title}
      </h1>

      <div className={ styles.cardBtn }>
        <CopyToClipboard text={ url }>
          <button
            className={ styles.btn }
            onClick={ handleClickUrl }
            data-testid="share-btn"
            type="button"
          >
            <img
              className={ styles.btnImage }
              src={ shareIcons }
              alt="Compartilhar"
            />
          </button>
        </CopyToClipboard>
        {copyUrl}
        <button
          className={ styles.btn }
          onClick={ handleFavorite }
          type="button"
        >
          <img
            data-testid="favorite-btn"
            src={ favorite ? blackHeart : whiteHeart }
            alt="Favoritar"
          />
        </button>
      </div>
      <Card.Text data-testid="recipe-category">{category}</Card.Text>
      <Card.Text className={ styles.cardText }>
        {children}
      </Card.Text>

      <Card.Text
        className={ styles.cardText }
        data-testid="instructions"
      >
        {instructions}
      </Card.Text>
      <Button
        className={ styles.finishRecipe }
        variant="danger"
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ isBtnDisabled }
        onClick={ () => { endRecipeButton(endRecipeParams); handleClickRedirect(); } }
      >
        Finalizar receita
      </Button>
    </Card>

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
  type: '',
  inputState: '',
  area: '',
  tags: '',
  style: '',
  match: {},
};

const mapStateToProps = (state) => ({
  inputState: state.inputReducer.checked,
});

export default connect(mapStateToProps)(CardeInProgress);
