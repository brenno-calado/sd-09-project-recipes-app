import React, { useContext, useEffect } from 'react';
import AppContext from '../contextApi/context';

const DoneRecipes = () => {
  const { doneRecipes } = useContext(AppContext);

  useEffect(() => {
    console.log(doneRecipes);
  }, [doneRecipes]);

  return (
    <div>
      <h1>Done Recipes</h1>
    </div>
  );
};

export default DoneRecipes;
