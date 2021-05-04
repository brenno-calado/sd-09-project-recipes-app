import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../context/context';

function MainCards() {
  const { searchFilter } = useContext(MyContext);
  const path = '';
  const MAX_NUMBER_OF_CARDS_12 = 12;

  return (
    <>
      {
        searchFilter.length > 1
          ? searchFilter.slice(0, MAX_NUMBER_OF_CARDS_12).map((curr, index) => (
            <Link to={ path } key={ index }>
              <div data-testid={ `${index}-recipe-card` } className="card">
                <img
                  src={ curr.strMealThumb || curr.strDrinkThumb }
                  alt=""
                  data-testid={ `${index}-card-img` }
                  className="card-img"
                />
                <p data-testid={ `${index}-card-name` } className="card-name">
                  { curr.strMeal || curr.strDrink }
                </p>
              </div>
            </Link>
          )) : null
      }
      <h2>teste</h2>
    </>
  );
}

export default MainCards;
