import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import { fecthByName } from '../services/api';
import 'react-multi-carousel/lib/styles.css';
import '../css/Recomendation.css';

function DrinksRecomendations() {
  const [drinks, setDrinks] = useState([]);

  const getDrinks = async () => {
    const data = await fecthByName('', false);
    const recomendations = 6;
    setDrinks(data.drinks.slice(0, recomendations));
  };

  useEffect(() => { getDrinks(); }, []);

  const responsive = {
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  if (!drinks.length) return <div>Loading...</div>;

  return (
    <Carousel responsive={ responsive } className="wrapper-carousel">
      { drinks.map((drink, index) => (
        <Link to={ `/bebidas/${drink.idDrink}` } key={ drink.idDrink } className="link">
          <div
            data-testid={ `${index}-recomendation-card` }
            key={ drink.idDrink }
            className="recomendation-card"
          >
            <img src={ drink.strDrinkThumb } alt={ drink.strDrink } />
            <h3 data-testid={ `${index}-recomendation-title` }>{drink.strDrink}</h3>
            <p className="category-text">{`Category: ${drink.strAlcoholic}`}</p>
            <p className="preview-instruction">{drink.strInstructions}</p>
          </div>
        </Link>
      ))}
    </Carousel>
  );
}

export default DrinksRecomendations;
