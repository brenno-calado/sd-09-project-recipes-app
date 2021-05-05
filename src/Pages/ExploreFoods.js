import React, { useEffect } from 'react';
import '../styles/ExploreFoods.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import FooterSpec from '../components/FooterSpec';
import { randomFoodDetailsThunk } from '../action/FoodAndDrinkDetailsAction';

function ExploreFoods() {
  const dispatch = useDispatch();

  const randomFoodDetails = () => {
    dispatch(randomFoodDetailsThunk());
  };

  const foodDetails = useSelector((state) => (
    state.FoodAndDrinkDetailsReducer.foodDetails
  ));

  useEffect(randomFoodDetails, [dispatch]);

  return (
    <div>
      <Header titleHeader="Explorar Comidas" id="1" />
      <div className="main-explore-foods">
        <Link to="/explorar/comidas/ingredientes">
          <button
            className="btnExploreFoods"
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button
            className="btnExploreFoods"
            type="button"
            data-testid="explore-by-area"
          >
            Por Local de Origem
          </button>
        </Link>
        <Link to={ `/comidas/${foodDetails.idMeal}` }>
          <button
            className="btnExploreFoods"
            type="button"
            data-testid="explore-surprise"
          >
            Me Surpreenda!
          </button>
        </Link>
      </div>
      <FooterSpec />
    </div>
  );
}

export default ExploreFoods;
