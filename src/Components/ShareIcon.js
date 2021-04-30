import React, { Component } from 'react';
import shareIcon from '../images/shareIcon.svg';

class ShareIcon extends Component {
  constructor(props) {
    super(props);

    // this.createAlert = this.createAlert.bind(props);
  }

  // createAlert() {
  //   const url = 'site';
  //   const
  // }

  render() {
    return (
      <button
        type="button"
        data-testid="share-btn"
        // onClick={ () => this.createAlert }
      >
        <img
          src={ shareIcon }
          alt="share-icon"
        />
      </button>
    );
  }
}

export default ShareIcon;
