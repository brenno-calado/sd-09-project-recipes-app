const fetchFoodIngredientsAPI = async () => {
  const myIngredients = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    .then((data) => data.json());
  return myIngredients.meals;
};

export default fetchFoodIngredientsAPI;
