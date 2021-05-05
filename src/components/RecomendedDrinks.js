import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import '../App.css';

const RecomendedDrinks = () => {
  const [cocktails, setCocktails] = useState([]);
  const limit = 6;

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const result = await response.json();
        setCocktails(result.drinks.slice(0, limit));
      } catch (error) {
        return Error(error);
      }
    };
    fetchCocktails();
  }, []);
  return (
    <div>
      <div>
        {
          cocktails.map((item, index) => (
            <div
              className="recommended-box"
              data-testid={ `${index}-recomendation-card` }
              key={ index }
            >
              <img
                className="recommended-box-image"
                style={ { width: 30, height: 30 } }
                src={ item.strDrinkThumb }
                alt={ item.strDrink }
              />
              <div>
                <span className="recommended-box-category">{item.strAlcoholic}</span>
                <span>{item.strDrink}</span>
                <p
                  className="recommended-box-name"
                  data-testid={ `${index}-recomendation-title` }
                >
                  {item.strDrink}

                </p>
              </div>
            </div>
          ))
        }
      </div>
    </div>

  );
};

export default RecomendedDrinks;
