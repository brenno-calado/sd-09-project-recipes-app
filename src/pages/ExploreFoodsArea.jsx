import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyContext from '../context/context';
import fetchApi from '../services';

function ExploreFoodsArea() {
  const { mealArea, handleCards, searchFilter, setSearchFilter,
    setHandleCards } = useContext(MyContext);
  const [optionValue, setOptionValue] = useState('All');
  const MAX_NUMBER_12 = 12;

  console.log(optionValue);

  const handleCardsApi = async () => {
    let apiResult = '';
    apiResult = await fetchApi.fetchMeals();
    setHandleCards(apiResult);
  };

  useEffect(() => {
    handleCardsApi();
  }, []);

  useEffect(() => {
    if (optionValue && optionValue !== 'All') {
      setSearchFilter(optionValue);
    }
  }, [optionValue]);

  return (
    <div>
      <Header title="Explorar Origem" />
      <main style={ { display: 'flex', flexDirection: 'column', alignItems: 'center' } }>
        <select
          data-testid="explore-by-area-dropdown"
          className="custom-select"
          style={ { marginTop: 15, width: 300 } }
        >
          <option
            value="All"
            data-testid="All-option"
            onChange={ ({ target }) => setOptionValue(target.value) }
          >
            All
          </option>
          {
            mealArea.map((area) => (
              <option
                value={ area.strArea }
                key={ area.strArea }
                data-testid={ `${area.strArea}-option` }
                onChange={ ({ target }) => setOptionValue(target.value) }
              >
                { area.strArea }
              </option>
            ))
          }
        </select>
        {
          searchFilter.length >= 1
            ? searchFilter.slice(0, MAX_NUMBER_12).map((curr, index) => (
              <Link to={ `/comidas/${curr.idMeal}` } key={ curr.idMeal }>
                <div data-testid={ `${index}-recipe-card` } className="card">
                  <img
                    src={ curr.strMealThumb }
                    alt=""
                    data-testid={ `${index}-card-img` }
                    className="card-img"
                  />
                  <p data-testid={ `${index}-card-name` } className="card-name">
                    { curr.strMeal }
                  </p>
                </div>
              </Link>
            )) : handleCards.slice(0, MAX_NUMBER_12).map((item, index) => (
              <Link to={ `/comidas/${item.idMeal}` } key={ item.idMeal }>
                <div data-testid={ `${index}-recipe-card` } className="card">
                  <img
                    src={ item.strMealThumb }
                    alt=""
                    data-testid={ `${index}-card-img` }
                    className="card-img"
                  />
                  <p data-testid={ `${index}-card-name` } className="card-name">
                    { item.strMeal }
                  </p>
                </div>
              </Link>
            ))
        }
      </main>
      <Footer />
    </div>
  );
}

export default ExploreFoodsArea;
