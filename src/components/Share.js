import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function Share(props) {
  const [urlCopied, setUrlCopied] = useState('');
  const { id, type, index } = props;
  const [card, setCard] = useState('');
  const onCopyText = () => {
    const timeout = 1000;
    setUrlCopied('Link copiado!');
    setTimeout(() => {
      setUrlCopied('');
    }, timeout);
  };

  const copyToClipBoard = async (idParam, elementParam) => {
    setCard(idParam);
    onCopyText();
    switch (elementParam) {
    case 'comida':
      await navigator.clipboard
        .writeText(`http://localhost:3000/comidas/${idParam}`);
      break;

    default:
      await navigator.clipboard
        .writeText(`http://localhost:3000/bebidas/${idParam}`);
      break;
    }
  };
  return (
    <div>
      <button
        type="button"
        onClick={ () => copyToClipBoard(id, type) }
      >
        <img
          src={ shareIcon }
          alt="share"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </button>
      <span>{ card === id ? urlCopied : null }</span>
    </div>
  );
}

Share.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  index: PropTypes.number,
}.isRequired;

export default Share;
