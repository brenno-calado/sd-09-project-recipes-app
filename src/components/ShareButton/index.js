import React, { useContext, useState, useEffect } from 'react';
import copy from 'clipboard-copy';

import RecipesContext from '../../context/RecipesContext';
import shareIcon from '../../images/shareIcon.svg';
import './ShareButton.css';

const ShareButton = () => {
  const { location } = useContext(RecipesContext);
  const [copied, setCopied] = useState(false);
  const URL = `http://localhost:3000${location.pathname}`;

  const copyUrl = () => {
    const sucessPromise = copy(URL);

    if (sucessPromise) {
      setCopied(true);
    }
  };

  useEffect(() => {
    const displayTime = 2000;
    if (copied) {
      setTimeout(() => setCopied(false), displayTime);
    }
  });

  return (
    <div>
      <button type="button" className="share-button" onClick={ () => copyUrl() }>
        <img data-testid="share-btn" src={ shareIcon } alt="Compartilhar" />
      </button>
      { copied && <span>Link copiado!</span> }
    </div>
  );
};

export default ShareButton;
