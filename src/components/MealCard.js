import React, { useEffect, useState, useContext } from 'react';
import { MyContext } from '../MyContext';
import Header from './Header';
import { fetchToMainScreen } from '../services/fetchAPI';

function MealCard() {
  const { isLoading, setIsLoading } = useContext(MyContext);
  const [data, setData] = useState([]);
  const limitMealsRender = 11;
  // strMealThumb --- strMeal
  useEffect(() => {
    fetchToMainScreen('meals').then((result) => {
      setData(result.meals);
      setIsLoading(false);
    });
  }, [setIsLoading]);

  return (
    <div>
      <Header />
      {isLoading ? <p>Loading...</p> : (
        data.map((element, index) => (
          index <= limitMealsRender ? (
            <div className="text-center" key={ element.strMeal }>
              <img
                className="img-thumbnail img-fluid"
                src={ element.strMealThumb }
                alt={ element.strMeal }
              />
              <h1>{ element.strMeal }</h1>
            </div>
          ) : null
        ))
      )}
    </div>
  );
}

export default MealCard;
