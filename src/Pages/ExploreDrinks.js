import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import FooterSpec from '../components/FooterSpec';
import { randomDrinkDetailsThunk } from '../action/FoodAndDrinkDetailsAction';

function ExploreDrinks() {
  const dispatch = useDispatch();

  const randomDrinkDetails = () => {
    dispatch(randomDrinkDetailsThunk());
  };

  const getDrinkDetails = useSelector((state) => (
    state.FoodAndDrinkDetailsReducer.drinkDetails
  ));

  useEffect(randomDrinkDetails, [dispatch]);

  return (
    <div>
      <Header titleHeader="Explorar Bebidas" id="1" />
      <p>Explore Drinks</p>
      <p>aqui será renderizado o header</p>
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to={ `/bebidas/${getDrinkDetails.idDrink}` }>
        <button type="button" data-testid="explore-surprise">Me Surpreenda!</button>
      </Link>
      <FooterSpec />
    </div>
  );
}

export default ExploreDrinks;
