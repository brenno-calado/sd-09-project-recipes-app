import React, { Component } from 'react';
import copy from 'clipboard-copy';
import ShareIcon from '../images/shareIcon.svg';

class Share extends Component {
  constructor() {
    super();
    this.addCopy = this.addCopy.bind(this);
  }

  addCopy() {
    copy(window.location.href)
      .then(() => alert('Link copiado!'))
      .catch(() => alert('Erro ao copiar link'));
  }

  render() {
    return (
      <button
        type="button"
        data-testid="share-btn"
        src={ ShareIcon }
        onClick={ this.addCopy }
      >
        <img src={ ShareIcon } alt="shareIcon" />
      </button>
    );
  }
}

export default Share;
