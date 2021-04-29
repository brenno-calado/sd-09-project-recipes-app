import React, { useState } from 'react';
import '../styles/recomendation.css';

function ShareButton() {
  const [shouldCopy, setShouldCopy] = useState('hidden');

  function handleClick() {
    const { href } = window.location;
    console.log(href);
    navigator.clipboard.writeText(href);
    setShouldCopy('');
  }
  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleClick }
      >
        Compartilhar
      </button>
      <p className={ shouldCopy }>Link copiado!</p>
    </div>
  );
}

export default ShareButton;
