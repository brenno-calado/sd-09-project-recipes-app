import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

class FooterMenu extends Component {
  render() {
    const { history: { push } } = this.props;
    return (
      <footer
        data-testid="footer"
        style={
          { position: 'fixed',
            bottom: '0px',
            whiteSpace: 'nowrap',
            display: 'flex',
            flexWrap: 'nowrap',
            justifyContent: 'space-between',
            width: '100%' }
        }
      >
        <button type="button" onClick={ () => push('/bebidas') }>
          <img
            alt="Go to drinks page"
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
          />
        </button>
        <button type="button" onClick={ () => push('/explorar') }>
          <img
            alt="Go to explore page"
            data-testid="explore-bottom-btn"
            src={ exploreIcon }
          />
        </button>
        <button type="button" onClick={ () => push('/comidas') }>
          <img
            alt="Go to food page"
            data-testid="food-bottom-btn"
            src={ mealIcon }
          />
        </button>
      </footer>
    );
  }
}

FooterMenu.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(FooterMenu);
