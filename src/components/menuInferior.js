import { Button } from 'bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const menuInferior = () => {
  return (
    <div data-testid="footer" className="footer" >
      <Link to="/cocktails">
        <Button
          data-testid="drinks-bottom-btn"
          src="src/images/drinkIcon.svg"
        />
      </Link>
      <Link to="/explorar">
        <Button
          data-testid="explore-bottom-btn"
          src="src/images/exploreIcon.svg"
        />
      </Link>
      <Link to="comidas">
        <Button
          data-testid="food-bottom-btn"
          src="src/images/mealIcon.svg"
        />
      </Link>
    </div>
  );
}

export default menuInferior;
