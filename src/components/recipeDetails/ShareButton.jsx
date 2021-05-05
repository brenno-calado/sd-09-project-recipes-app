import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton({ url }) {
  const [hasCopied, setHasCopied] = useState(false);

  const copyShareLink = async () => {
    copy(`http://localhost:3000${url}`);
    setHasCopied(true);
  };

  return (
    <button
      data-testid="share-btn"
      type="button"
      onClick={ copyShareLink }
    >
      { hasCopied
        ? <span>Link copiado!</span>
        : <img src={ shareIcon } alt="Compartilhar" /> }
    </button>
  );
}

ShareButton.propTypes = {
  url: PropTypes.string,
}.isRequired;

export default ShareButton;
