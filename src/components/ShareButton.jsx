import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { string, number } from 'prop-types';
import ShareIcon from '../images/shareIcon.svg';

export default function ShareButton({ category, id, index }) {
  const [copied, setCopied] = useState(false);

  const { pathname } = useLocation();

  function copyLink() {
    const URL = 'http://localhost:3000';
    // const TIMEOUT = 3000;

    navigator.clipboard.writeText(`${URL}/${category.concat('s')}/${id}`);
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
          data-testid={
            pathname.includes('receitas-feitas')
            || pathname.includes('receitas-favoritas')
              ? `${index}-horizontal-share-btn`
              : 'share-btn'
          }
        />
      </button>
      <br />
      {copied
        && <span>Link copiado!</span>}
    </>
  );
}

ShareButton.propTypes = {
  category: string.isRequired,
  id: string.isRequired,
  index: number,
};

ShareButton.defaultProps = {
  index: 0,
};
