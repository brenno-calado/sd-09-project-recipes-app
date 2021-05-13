import { string, arrayOf, shape, bool, func } from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';
import blackHeart from '../../images/blackHeartIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import shareIcons from '../../images/shareIcon.svg';
import useHandleClickUrl from '../../hooks/useHandleClickUrl';
import { useRecipeContext } from '../../contexts/recipeContext';
import styles from './cardDetails.module.css';

function CardDetails({
  image, title, video, categoryText, instructions, type, id, inputState,
  shouldVideoApear, children, isAlcoholic, handleFavoriteClick, favorite }) {
  const [copyUrl, handleClickUrl] = useHandleClickUrl();
  const { setBtnText, setShouldBtnApear } = useRecipeContext();

  const url = window.location.href;

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storage && storage[type] && storage[type][id]
        && (storage[type][id].length < children.length)) {
      setBtnText('Continuar Receita');
    } else if (storage && storage[type] && storage[type][id]
      && (children.length === storage[type][id].length)) {
      setShouldBtnApear(true);
    } else {
      setShouldBtnApear(false);
    }
  }, [children.length, id, type, setBtnText, inputState, setShouldBtnApear]);

  return (
    <Card className={ styles.cardContainer }>
      <Card.Img
        className={ styles.cardImage }
        variant="top"
        width="340px"
        src={ image }
        data-testid="recipe-photo"
        alt={ title }
      />
      <h1
        className={ styles.cardTitle }
        data-testid="recipe-title"
      >
        { title }

      </h1>
      {!shouldVideoApear && <p data-testid="recipe-category">{isAlcoholic}</p>}
      <div className={ styles.cardBtn }>
        <CopyToClipboard text={ url }>
          <button
            className={ styles.btn }
            onClick={ handleClickUrl }
            data-testid="share-btn"
            type="button"
          >
            <img className={ styles.btnImage } src={ shareIcons } alt="Compartilhar" />
          </button>
        </CopyToClipboard>
        {copyUrl}
        <button
          className={ styles.btn }
          type="button"
          onClick={ handleFavoriteClick }
        >
          <img
            className={ styles.btnImage }
            data-testid="favorite-btn"
            src={ favorite ? blackHeart : whiteHeart }
            alt="Favoritar"
          />
        </button>
      </div>

      <Card.Text data-testid="recipe-category">{ categoryText }</Card.Text>

      <Card.Text className={ styles.cardText }>
        {children}
      </Card.Text>

      <Card.Text
        className={ styles.cardText }
        data-testid="instructions"
      >
        { instructions }
      </Card.Text>

      { shouldVideoApear && (
        <iframe
          className={ styles.cardVideo }
          title={ title }
          width="278"
          height="200"
          src={ video.replace('watch?v=', 'embed/') }
          data-testid="video"
        />
      )}
    </Card>
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
  inputState: string,
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
  inputState: '',
};

const mapStateToProps = (state) => ({
  inputState: state.inputReducer.checked,
});

export default connect(mapStateToProps)(CardDetails);
