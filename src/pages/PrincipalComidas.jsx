import React, { useContext, useEffect } from 'react';
import MainFoods from '../components/MainFoods';
import MealContext from '../context/MealContext';

function PrincipalComidas() {
  const { foodFilter } = useContext(MealContext);

  useEffect(() => {
    foodFilter();
  });

  return (
    <div>
      <MainFoods />
    </div>
  );
}

export default PrincipalComidas;
