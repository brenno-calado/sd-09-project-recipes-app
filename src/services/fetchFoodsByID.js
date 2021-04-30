const fetchFoodsByID = async (id) => {
  const myFood = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((data) => data.json());
  return myFood.meals;
};

export default fetchFoodsByID;
