import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import { changePath } from '../redux/actions';
import '../css/Footer.css';

const Footer = ({ pathnameDispatcher }) => (
  <footer data-testid="footer">
    <Link
      to="/bebidas"
      onClick={ () => pathnameDispatcher('/bebidas', 'bebidas') }
    >
      <img
        src={ drinkIcon }
        data-testid="drinks-bottom-btn"
        alt="Icone da pagina de bebida "
      />
    </Link>
    <Link to="/explorar">
      <img
        src={ exploreIcon }
        data-testid="explore-bottom-btn"
        alt="Icone da pagina de bebida "
      />
    </Link>
    <Link
      to="/comidas"
      onClick={ () => pathnameDispatcher('/comidas', 'comidas') }
    >
      <img
        src={ mealIcon }
        data-testid="food-bottom-btn"
        alt="Icone da pagina de bebida "
      />
    </Link>
  </footer>
);

const mapDispatchToProps = (dispatch) => ({
  pathnameDispatcher:
  (pathname, recipeType) => dispatch(changePath(pathname, recipeType)),
});

Footer.propTypes = {
  pathnameDispatcher: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Footer);
