const fetchDrinkIngredientsAPI = async () => {
  const myIngredients = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
    .then((data) => data.json());
  return myIngredients.drinks;
};

export default fetchDrinkIngredientsAPI;
