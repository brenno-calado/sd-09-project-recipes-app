import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Footer from '../components/footer';
import Header from '../components/header';
import CardContainer from '../components/cardContainer';
import { getIngredients } from '../actions';
import store from '../store/store';
import getFoodsAndDrinks from '../services/servicesAPI';

export default function ExploreFoodIngredients() {
  const { pathname } = window.location;
  const foodPath = '/explorar/comidas/ingredientes';
  const { recipesReducer: { ingredients } } = store.getState();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchIngreds = async () => {
      const typeOfFetch = pathname === foodPath ? 'meals' : 'drinks';
      const fetchIngred = await getFoodsAndDrinks(typeOfFetch, 'getIngredient');
      const objecOfActions = {
        meals: () => (dispatch(getIngredients(fetchIngred))),
        drinks: () => (dispatch(getIngredients(fetchIngred))),
      };

      objecOfActions[typeOfFetch]();
    };

    fetchIngreds();
  });

  return (
    <>
      <Header page="Explorar Ingredientes" />
      <CardContainer recipes={ ingredients } path={ pathname } />
      <Footer />
    </>
  );
}
