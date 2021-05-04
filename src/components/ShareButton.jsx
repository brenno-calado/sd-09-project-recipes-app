import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import '../styles/recomendation.css';

function ShareButton({ dataTestId, urlCopied }) {
  const [shouldCopy, setShouldCopy] = useState('hidden');

  function handleClick() {
    navigator.clipboard.writeText(urlCopied);
    setShouldCopy('');
  }

  return (
    <div>
      <button
        type="button"
        src={ shareIcon }
        onClick={ handleClick }
      >
        <img
          src={ shareIcon }
          alt="share"
          data-testid={ dataTestId }
        />
      </button>
      <p className={ shouldCopy }>Link copiado!</p>
    </div>
  );
}

ShareButton.propTypes = {
  dataTestId: PropTypes.string.isRequired,
  urlCopied: PropTypes.string.isRequired,
};

export default ShareButton;
