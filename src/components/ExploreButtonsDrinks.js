import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ExploreButtonsDrinks = () => {
  const [myDrink, setMyDrink] = useState([]);

  const loadRandomDrink = async () => {
    const myRandomDrink = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then((drink) => drink.drinks[0]);
    setMyDrink(myRandomDrink);
  };

  useEffect(() => {
    loadRandomDrink();
  }, []);

  return (
    <div>
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>

      <Link to={ `/bebidas/${myDrink.idDrink}` }>
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </Link>
    </div>
  );
};

export default ExploreButtonsDrinks;
