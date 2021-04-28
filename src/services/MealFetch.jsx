const MEAL_DB_BASE = 'https://www.themealdb.com/api/json/v1/1/';

const getMealsByName = async (name) => {
  try {
    const mealDBRequest = await fetch(`${MEAL_DB_BASE}search.php?s=${name}`);
    const respJson = await mealDBRequest.json();
    console.log('fetch', respJson);
    return respJson;
  } catch (error) {
    console.log('Deu ruim...', error);
  }
};

export default getMealsByName;
