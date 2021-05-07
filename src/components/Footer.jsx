import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import { changePath } from '../redux/actions';

const styleImg = {
  height: 30,
};

const Footer = ({ pathnameDispatcher }) => (
  <footer data-testid="footer">
    <Navbar
      expand="lg"
      variant="light"
      fixed="bottom"
      style={ { backgroundColor: '#F2EDA2', height: 30 } }
    >
      <Container>
        <Link
          to="/bebidas"
          onClick={ () => pathnameDispatcher('/bebidas', 'bebidas') }
        >
          <img
            src={ drinkIcon }
            style={ styleImg }
            data-testid="drinks-bottom-btn"
            alt="Icone da pagina de bebida "
          />
        </Link>
        <Link to="/explorar">
          <img
            style={ styleImg }
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
            style={ styleImg }
            src={ mealIcon }
            data-testid="food-bottom-btn"
            alt="Icone da pagina de bebida "
          />
        </Link>
      </Container>
    </Navbar>
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
