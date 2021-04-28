const fetchFoodAreaAPI = async () => {
  const myAreas = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then((data) => data.json());
  return myAreas.meals;
};

export default fetchFoodAreaAPI;
