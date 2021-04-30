import React, { useState, useEffect, useContext } from 'react';
import { MyContext } from '../MyContext';
import { fetchToMainScreen } from '../services/fetchAPI';
import Header from './Header';

function DrinkCard() {
  const { isLoading, setIsLoading } = useContext(MyContext);
  const [data, setData] = useState([]);
  const limitDrinksRender = 11;
  // strDrinkThumb --- strDrink
  useEffect(() => {
    fetchToMainScreen('drinks').then((result) => {
      setData(result.drinks);
      setIsLoading(false);
    });
  }, [setIsLoading]);
  return (
    <div>
      <Header />
      {isLoading ? <p>Loading...</p> : (
        data.map((element, index) => (
          index <= limitDrinksRender ? (
            <div className="text-center" key={ element.strMeal }>
              <img
                className="img-thumbnail img-fluid"
                src={ element.strDrinkThumb }
                alt={ element.strDrink }
              />
              <h1>{ element.strDrink }</h1>
            </div>
          ) : null
        ))
      )}
    </div>
  );
}

export default DrinkCard;
