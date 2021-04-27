const MEAL_DB_BASE = 'www.themealdb.com/api/json/v1/1/';

const getMeals = async () => {
  try {
    const mealDBRequest = await fetch(`${MEAL_DB_BASE}search.php?s=Arrabiata`);
    const respJson = await mealDBRequest.json();
    console.log('fetch', respJson);
    return respJson;
  } catch (error) {
    console.log(error);
  }
};

export default getMeals;
