import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';
import './style.css';

export default function ShareRecipeButton({ dataTestid, isMeal, recipeId }) {
  const [showCopyMessage, setShowCopyMessage] = useState(false);

  function handleShareClick() {
    setShowCopyMessage(true);
    const timeToHideMessage = 2000;
    setTimeout(() => {
      setShowCopyMessage(false);
    }, timeToHideMessage);
    const bebidasOrComidas = isMeal ? 'comidas' : 'bebidas';
    const currentPath = `${window.location.origin}/${bebidasOrComidas}/${recipeId}`;
    copy(currentPath);
  }

  return (
    <div>
      <button className="share-button" type="button" onClick={ handleShareClick }>
        <img data-testid={ dataTestid } src={ shareIcon } alt="Icone de compartilhar" />
      </button>
      { showCopyMessage && <span className="copied-message">Link copiado!</span> }
    </div>
  );
}

ShareRecipeButton.propTypes = {
  dataTestid: PropTypes.string.isRequired,
  isMeal: PropTypes.bool.isRequired,
  recipeId: PropTypes.string.isRequired,
};
