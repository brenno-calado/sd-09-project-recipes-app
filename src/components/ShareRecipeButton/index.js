import React, { useState } from 'react';
import copy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';
import './style.css';

export default function ShareRecipeButton() {
  const [showCopyMessage, setShowCopyMessage] = useState(false);

  function handleShareClick() {
    setShowCopyMessage(true);
    const timeToHideMessage = 2000;
    setTimeout(() => {
      setShowCopyMessage(false);
    }, timeToHideMessage);
    const currentPath = window.location.href.replace('/in-progress', '');
    copy(currentPath);
  }

  return (
    <div>
      <button
        className="share-button"
        type="button"
        data-testid="share-btn"
        onClick={ handleShareClick }
      >
        <img src={ shareIcon } alt="Icone de compartilhar" />
      </button>
      { showCopyMessage && <span className="copied-message">Link copiado!</span> }
    </div>
  );
}
