import React, { Component } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import ShareIcon from '../images/shareIcon.svg';

class Share extends Component {
  constructor(props) {
    super(props);
    this.addCopy = this.addCopy.bind(this);
    this.state = {
      p: '',
      copied: false,
    };
  }

  addCopy() {
    const { value } = this.props;
    let url = window.location.href;
    if (url.includes('/in-progress')) url = url.replaceAll('/in-progress', '');
    if (url.includes('/receitas-feitas')) {
      url = url.replaceAll('/receitas-feitas', `${value}`);
    }
    copy(url)
      .then(() => this.setState({ p: 'Link copiado!' }));
    this.setState({ copied: true });
  }

  render() {
    const { p, copied } = this.state;
    const { id } = this.props;
    return (
      <button
        className={ !copied ? 'btnShare' : 'shared' }
        type="button"
        data-testid={ id }
        src={ ShareIcon }
        onClick={ this.addCopy }
      >
        <p>{p}</p>
        <img src={ ShareIcon } alt="shareIcon" />
      </button>
    );
  }
}

Share.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Share;
