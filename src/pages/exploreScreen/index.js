import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

import profileIcon from '../../images/profileIcon.svg';

class ExplorerScreen extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({ target }) {
    const { name } = target;
    const { history } = this.props;
    history.push(`/explorar/${name}`);
  }

  render() {
    return (
      <div className="explore-screen">
        <header className="explore-screen-header">
          <img src={ profileIcon } alt="Profile icon" />
          <span className="explore-screen-header-title">
            Explorar
          </span>
        </header>
        <button
          className="explore-screen-button"
          type="button"
          name="comidas"
          data-testid="explore-food"
          onClick={ this.handleClick }
        >
          Explorar Comidas
        </button>
        <button
          className="explore-screen-button"
          type="button"
          name="bebidas"
          data-testid="explore-drinks"
          onClick={ this.handleClick }
        >
          Explorar Bebidas
        </button>
      </div>
    );
  }
}

ExplorerScreen.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ExplorerScreen;
