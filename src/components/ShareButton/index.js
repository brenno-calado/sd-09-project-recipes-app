import copy from 'clipboard-copy';
import { number } from 'prop-types';
import React, { useState, useEffect } from 'react';

import shareIcon from '../../images/shareIcon.svg';

import './ShareButton.css';

const ShareButton = (props) => {
  const [copied, setCopied] = useState(false);

  const { dataTestIdIndex, URL } = props;

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
      <button
        type="button"
        src={ shareIcon }
        className="share-button"
        onClick={ () => copyUrl() }
        data-testid={ `${dataTestIdIndex}-horizontal-share-btn` }
      >
        <img data-testid="share-btn" src={ shareIcon } alt="Compartilhar" />
      </button>
      { copied && <span>Link copiado!</span> }
    </div>
  );
};

ShareButton.propTypes = {
  dataTestIdIndex: number,
}.isRequired;

export default ShareButton;
