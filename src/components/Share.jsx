import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import shareImg from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function Share() {
  const location = useLocation();
  const [message, setMessage] = useState(false);
  // console.log(location);

  function clickHandler() {
    copy(`http://localhost:3000${location.pathname}`);
    setMessage(true);
  }
  return (
    <>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ clickHandler }
      >
        <img src={ shareImg } alt="Share" />
      </button>
      {message && <p>Link copiado!</p>}
    </>
  );
}

export default Share;
