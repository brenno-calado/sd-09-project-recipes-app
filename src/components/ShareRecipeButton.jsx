import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function ShareRecipeButton({ pathname }) {
  const [showMessage, setShowMessage] = useState(false);

  const getLink = async () => {
    const magicNumber = 4000;
    const link = `http://localhost:3000${pathname}`;
    await navigator.clipboard.writeText(link);
    setShowMessage(true);
    setTimeout(() => { setShowMessage(false); }, magicNumber);
  };

  return (
    <div>
      <button
        type="button"
        onClick={ getLink }
        data-testid="share-btn"
      >
        <img src={ shareIcon } alt="botao de compartilhar" />
        Compartilhar
      </button>
      { showMessage && <p>Link copiado!</p> }
    </div>
  );
}

ShareRecipeButton.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default ShareRecipeButton;
