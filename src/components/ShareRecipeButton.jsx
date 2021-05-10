import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import shareIcon from '../images/shareIcon.svg';

function ShareRecipeButton({ pathname }) {
  const [showMessage, setShowMessage] = useState(false);

  const getLink = async () => {
    const result = pathname.split('in-progress');
    if (result[0].endsWith('/')) {
      const newPathname = result[0].substring(0, result[0].length - 1);
      const magicNumber = 4000;
      const link = `http://localhost:3000${newPathname}`;
      await navigator.clipboard.writeText(link);
      setShowMessage(true);
      setTimeout(() => { setShowMessage(false); }, magicNumber);
    }
    if (!result[0].endsWith('/')) {
      const magicNumber = 4000;
      const link = `http://localhost:3000${pathname}`;
      await navigator.clipboard.writeText(link);
      setShowMessage(true);
      setTimeout(() => { setShowMessage(false); }, magicNumber);
    }
  };

  return (
    <div>
      <Button
        size="lg"
        variant="outline-dark"
        style={ { height: '50px', width: '80px' } }
        type="button"
        onClick={ getLink }
        data-testid="share-btn"
      >
        <img src={ shareIcon } alt="botao de compartilhar" />
      </Button>
      <div>
        { showMessage && <p>Link copiado!</p> }
      </div>
    </div>
  );
}

ShareRecipeButton.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default ShareRecipeButton;
