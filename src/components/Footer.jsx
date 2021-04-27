import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../App.css';
import { setPage } from '../actions/page';

function Footer({ sendPage }) {
  return (
    <footer data-testid="footer">
      <Link to="/bebidas">
        <button type="button" onClick={ () => sendPage('bebidas') }>
          <img src={ drinkIcon } alt="Drinks" data-testid="drinks-bottom-btn" />
        </button>
      </Link>
      <Link to="/explorar">
        <button type="button" onClick={ () => sendPage('explorar') }>
          <img src={ exploreIcon } alt="Explore" data-testid="explore-bottom-btn" />
        </button>
      </Link>
      <Link to="/comidas">
        <button type="button" onClick={ () => sendPage('comidas') }>
          <img src={ mealIcon } alt="Meals" data-testid="food-bottom-btn" />
        </button>
      </Link>
    </footer>
  );
}

const mapDispatchToProps = (dispatch) => ({
  sendPage: (page) => dispatch(setPage(page)),
});

Footer.propTypes = {
  sendPage: func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Footer);
