import React from 'react';

import shareIcon from '../../images/shareIcon.svg';

const ShareButton = () => (
  <div>
    <img
      data-testid="share-btn"
      src={ shareIcon }
      alt="Compartilhar"
    />
  </div>
);

export default ShareButton;
