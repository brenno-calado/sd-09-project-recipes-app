import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton() {
  const [copied, setCopy] = useState(false);
  const history = useHistory();

  function renderMessage() {
    return (
      <span>Link copiado!</span>
    );
  }

  function shareButtonClick() {
    setCopy(true);
    copy(`http://localhost:3000${history.location.pathname}`);
    renderMessage();
  }

  return (
    <button
      type="button"
      data-testid="share-btn"
      onClick={ shareButtonClick }
    >
      { copied ? renderMessage() : (<img src={ shareIcon } alt="Compartilhar" />) }
    </button>
  );
}

export default ShareButton;
