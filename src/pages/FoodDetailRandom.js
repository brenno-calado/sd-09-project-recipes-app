import React from 'react';

const FoodDetailRandom = () => {
  const FoodApi = 'https://www.themealdb.com/api/json/v1/1/random.php';

  const getApi = async () => {
    const FoodDetail = await fetch(FoodApi)
      .then((response) => response.json())
      .then((response) => response.results);
    return FoodDetail;
  };

  return (
    <h1>
      Receita Aleatória
    </h1>
  );
};

export default FoodDetailRandom;
