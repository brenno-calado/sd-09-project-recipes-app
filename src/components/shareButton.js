import React from 'react';
import { string } from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import copy from 'clipboard-copy';
import share from '../images/shareIcon.svg';

export default function ShareButton({ datatestid, url }) {
  const btn = 'btn btn-light border m-1';

  const message = (props) => (
    <Tooltip
      id="message"
      { ...props }
    >
      Link copiado!
    </Tooltip>);

  return (
    <OverlayTrigger
      trigger="click"
      delay={ { show: 250, hide: 400 } }
      placement="top"
      overlay={ message }
    >
      <button
        type="button"
        onClick={ () => copy(`${url}`) }
        className={ btn }
        src={ share }
        data-testid={ datatestid }
      >
        <img src={ share } alt="shareIcon" />
      </button>
    </OverlayTrigger>
  );
}

ShareButton.propTypes = {
  datatestid: string.isRequired,
  url: string.isRequired,
};
