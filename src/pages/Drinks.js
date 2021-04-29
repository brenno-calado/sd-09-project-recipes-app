import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import FooterMenu from '../components/FooterMenu';
import { fetchDrinksApi, fetchDrinksCategories } from '../services';
import '../App.css';
import DrinkCards from '../components/DrinkCards';
import { receiveCategoryDrink, receiveDataDrink } from '../redux/actions';

function Drinks() {
  const [loading, isFetching] = useState(true);

  const drinks = useSelector((state) => state.drinkReducer.drinks);
  const dispatch = useDispatch();
  const category = useSelector((state) => state.drinkReducer.category);

  useEffect(() => {
    async function cardMount() {
      const number12 = 12;
      const number5 = 5;

      const categoryDrinks = await fetchDrinksCategories();
      const dataDrinks = await fetchDrinksApi();

      const categoryResult = categoryDrinks.slice(0, number5);
      const drinkResult = dataDrinks.slice(0, number12);

      dispatch(receiveDataDrink(drinkResult));
      dispatch(receiveCategoryDrink(categoryResult));

      return isFetching(false);
    }
    cardMount();
  }, [loading, dispatch]);

  return (
    <>
      { loading ? <h1> Loading...</h1> : DrinkCards(category, drinks) }
      <FooterMenu />
    </>
  );
}

export default connect()(Drinks);
