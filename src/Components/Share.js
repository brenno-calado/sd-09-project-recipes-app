import React, { Component } from 'react';
import copy from 'clipboard-copy';
import ShareIcon from '../images/shareIcon.svg';

class Share extends Component {
  constructor() {
    super();
    this.addCopy = this.addCopy.bind(this);
    this.state = {
      p: '',
    };
  }

  addCopy() {
    let url = window.location.href;
    if (url.includes('/in-progress')) url = url.replaceAll('/in-progress', '');
    copy(url)
      .then(() => this.setState({ p: 'Link copiado!' }));
  }

  render() {
    const { p } = this.state;
    return (
      <button
        type="button"
        data-testid="share-btn"
        src={ ShareIcon }
        onClick={ this.addCopy }
      >
        <p>{p}</p>
        <img src={ ShareIcon } alt="shareIcon" />
      </button>
    );
  }
}

export default Share;
