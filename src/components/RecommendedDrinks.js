import React, { useEffect, useState } from 'react';
import './Recomended.css';

const RecomendedDrinks = () => {
  const [drinks, setDrinks] = useState([]);
  const limit = 6;

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const result = await response.json();
        setDrinks(result.drinks.slice(0, limit));
      } catch (error) {
        return Error(error);
      }
    };
    fetchDrinks();
  }, []);
  return (
    <div className="recommendation-container">
      {
        drinks.map((drink, index) => (
          <div
            className="recommended-box"
            data-testid={ `${index}-recomendation-card` }
            key={ index }
          >
            <img
              className="recommended-box-image"
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
            />
            <div>
              <span className="recommended-box-category">{drink.strAlcoholic}</span>
              <span>{drink.strDrink}</span>
              <p
                className="recommended-box-name"
                data-testid={ `${index}-recomendation-title` }
              >
                {drink.strDrink}
              </p>
            </div>
          </div>
        ))
      }
    </div>

  );
};

export default RecomendedDrinks;
