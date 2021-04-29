import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

function index() {
  return (
    <div className="footer" data-testid="footer">
      <Link data-testid="drinks-bottom-btn" to="/bebidas">
        <img src="drinkIcon.svg" alt="drinkIcon" />
      </Link>
      <Link data-testid="explore-bottom-btn" to="/explorar">
        <img src="exploreIcon.svg" alt="exploreIcon" />
      </Link>
      <Link data-testid="food-bottom-btn" to="/comidas">
        <img src="mealIcon.svg" alt="mealIcon" />
      </Link>
    </div>
  );
}

export default index;
