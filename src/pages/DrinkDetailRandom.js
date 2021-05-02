import React from 'react';

const DrinkDetailRandom = () => {
  const DrinkApi = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

  const getApi = async () => {
    const DrinkDetail = await fetch(DrinkApi)
      .then((response) => response.json())
      .then((response) => response.results);
    return DrinkDetail;
  };

  return (
    <h1>
      Bebida Aleatória
    </h1>
  );
};

export default DrinkDetailRandom;
