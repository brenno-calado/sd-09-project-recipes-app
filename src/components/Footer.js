import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/explorar/bebidas">
        <button
          data-testid="drinks-bottom-btn"
          type="button"
        >
          Explore Bebidas
        </button>
      </Link>

      <Link to="/explorar">
        <button
          data-testid="explore-bottom-btn"
          type="button"
        >
          Explore
        </button>
      </Link>

      <Link to="/explorar/comidas">
        <button
          data-testid="food-bottom-btn"
          type="button"
        >
          Explore Comidas
        </button>
      </Link>
    </footer>
  );
}

export default Footer;
