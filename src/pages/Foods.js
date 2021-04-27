import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import FooterMenu from '../components/FooterMenu';
import fetchMealsApi from '../services';
import '../App.css';

export default function Foods() {
  const [data, getData] = useState([]);
  const [loading, isFetching] = useState(true);

  async function cardMount() {
    const number = 12;
    const dataMeals = await fetchMealsApi();
    isFetching(false);
    const result = dataMeals.slice(0, number);
    getData([
      ...result,
    ]);
  }

  useEffect(() => {
    cardMount();
  }, []);

  return (
    <>
      <section
        className="row"
        style={ {
          justifyContent: 'space-around',
          margin: '5px',
        } }
      >
        { loading ? <h1>Loading...</h1> : data.map((meal, index) => (
          <div
            key={ meal.idMeal }
            data-testid={ `${index}-recipe-card` }
            className="card"
            style={ {
              width: '8rem',
              alignItems: 'center',
              marginBottom: '5px',
            } }
          >
            <img
              src={ meal.strMealThumb }
              data-testid={ `${index}-card-img` }
              alt={ `${meal.strMeal} recipe` }
              className="card-img-top"
              style={ { width: '7rem', margin: '4px' } }
            />
            <h5
              data-testid={ `${index}-card-name` }
              classeName="card-title"
            >
              {meal.strMeal}
            </h5>
          </div>
        ))}
      </section>
      <FooterMenu />
    </>
  );
}
