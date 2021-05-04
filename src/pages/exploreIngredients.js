import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import Footer from '../components/footer';
import Header from '../components/header';
import CardContainer from '../components/cardContainer';
import { getIngredients } from '../actions';
import getFoodsAndDrinks from '../services/servicesAPI';

export default function ExploreFoodIngredients() {
  const { pathname } = window.location;
  const foodPath = '/explorar/comidas/ingredientes';
  const [redirect, setRedirect] = useState(false);
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
  }, [pathname, dispatch]);

  const ingredientList = useSelector(
    (state) => (state.recipesReducer.ingredients),
  );

  const redirectToMain = () => {
    setRedirect(true);
  };

  if (redirect) return (<Redirect to={ `/${pathname.split('/')[2]}` } />);

  return (
    <>
      <Header page="Explorar Ingredientes" />
      <CardContainer
        recipes={ ingredientList }
        path={ pathname }
        cardType="ingredient"
        redirectCallback={ redirectToMain }
      />
      <Footer />
    </>
  );
}
