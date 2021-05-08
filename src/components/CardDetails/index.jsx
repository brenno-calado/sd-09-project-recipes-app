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
    <Card style={ { width: '18rem', margin: '15px 0 ', padding: '5px' } }>
      <Card.Img
        variant="top"
        width="340px"
        src={ image }
        data-testid="recipe-photo"
        alt={ title }
      />
      <Card.Title data-testid="recipe-title">{ title }</Card.Title>
      {!shouldVideoApear && <p data-testid="recipe-category">{isAlcoholic}</p>}
      <div style={ { display: 'flex', justifyContent: 'flex-end', gap: '15px' } }>
        <CopyToClipboard text={ url }>
          <button
            style={ { background: 'transparent', border: 'none' } }
            onClick={ handleClickUrl }
            data-testid="share-btn"
            type="button"
          >
            <img src={ shareIcons } alt="Compartilhar" />
          </button>
        </CopyToClipboard>
        {copyUrl}
        <button
          style={ { background: 'transparent', border: 'none' } }
          type="button"
          onClick={ handleFavoriteClick }
        >
          <img
            data-testid="favorite-btn"
            src={ favorite ? blackHeart : whiteHeart }
            alt="Favoritar"
          />
        </button>
      </div>

      <Card.Text data-testid="recipe-category">{ categoryText }</Card.Text>

      <Card.Text>
        {children}
      </Card.Text>

      <Card.Text data-testid="instructions">{ instructions }</Card.Text>

      { shouldVideoApear && (
        <iframe
          title={ title }
          width="278"
          height="200"
          src={ video }
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
