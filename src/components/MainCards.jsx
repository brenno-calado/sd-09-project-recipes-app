import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MyContext from '../context/context';
import fetchApi from '../services/index';

function MainCards() {
  const { searchFilter, setHandleCards, handleCards } = useContext(MyContext);
  const MAX_NUMBER_OF_CARDS_12 = 12;
  const { pathname } = useLocation();

  const handleCardsApi = async () => {
    let apiResult = '';
    if (pathname === '/comidas' || pathname === '/explorar/comidas/area') {
      apiResult = await fetchApi.fetchMeals();
      setHandleCards(apiResult);
    } else if (pathname === '/bebidas') {
      apiResult = await fetchApi.fetchDrinks();
      setHandleCards(apiResult);
    }
  };

  useEffect(() => {
    handleCardsApi();
  }, []);

  return (
    <div className="main-container">
      {
        searchFilter.length >= 1
          ? searchFilter.slice(0, MAX_NUMBER_OF_CARDS_12).map((curr, index) => (
            <Link to={ `${pathname}/${curr.idMeal || curr.idDrink}` } key={ index }>
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
          )) : handleCards.slice(0, MAX_NUMBER_OF_CARDS_12).map((item, index) => (
            <Link to={ `${pathname}/${item.idMeal || item.idDrink}` } key={ index }>
              <div data-testid={ `${index}-recipe-card` } className="card">
                <img
                  src={ item.strMealThumb || item.strDrinkThumb }
                  alt=""
                  data-testid={ `${index}-card-img` }
                  className="card-img"
                />
                <p data-testid={ `${index}-card-name` } className="card-name">
                  { item.strMeal || item.strDrink }
                </p>
              </div>
            </Link>
          ))
      }
    </div>
  );
}

export default MainCards;
