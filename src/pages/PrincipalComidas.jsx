import React, { useCallback, useContext, useEffect } from 'react';
import MainFoods from '../components/MainFoods';
import MealContext from '../context/MealContext';

function PrincipalComidas() {
  const { foodFilter } = useContext(MealContext);

  const foodFilterCallBack = useCallback(() => foodFilter(), [foodFilter]);

  useEffect(() => {
    foodFilterCallBack();
  }, []);

  return (
    <div>
      <MainFoods />
    </div>
  );
}

export default PrincipalComidas;
