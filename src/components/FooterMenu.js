import React, { Component } from 'react';
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
            alt="Vai para a página de bebidas"
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
          />
        </button>
        <button type="button" onClick={ () => push('/explorar') }>
          <img
            alt="Vai para a página de explorar"
            data-testid="explore-bottom-btn"
            src={ exploreIcon }
          />
        </button>
        <button type="button" onClick={ () => push('/comidas') }>
          <img
            alt="Vai para a página de comidas"
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

export default FooterMenu;
