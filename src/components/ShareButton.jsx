import React, { useState } from 'react';
import { string } from 'prop-types';
import ShareIcon from '../images/shareIcon.svg';

export default function ShareButton({ category, id }) {
  const [copied, setCopied] = useState(false);

  function copyLink() {
    const URL = 'http://localhost:3000';
    // const TIMEOUT = 3000;

    navigator.clipboard.writeText(`${URL}/${category}/${id}`);
    // setTimeout(() => setCopied(false), TIMEOUT);
    setCopied(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={ copyLink }
      >
        <img
          src={ ShareIcon }
          alt="Ícone de compartilhamento"
          data-testid="share-btn"
        />
      </button>
      <br />
      {copied
        && <span>Link copiado!</span>}
    </>
  );
}

ShareButton.propTypes = {
  category: string,
  id: string,
}.isRequired;
