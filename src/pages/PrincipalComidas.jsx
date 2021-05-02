import React from 'react';
// import { Redirect } from 'react-router';
import Header from '../components/Header';
// import MealContext from '../context/MealContext';

function PrincipalComidas() {
  // const { foods } = useContext(MealContext);
  return (
    <div>
      {/* { foods.length === 1
        ? <Redirect to={ `/comidas/${foods[0].idMeals}` } /> : null } */}
      <Header textProp="Comidas" />
      <span>Placeholder</span>
    </div>);
}

export default PrincipalComidas;
