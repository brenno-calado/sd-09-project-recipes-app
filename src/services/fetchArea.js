const fetchAreas = async () => {
  const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  try {
    const response = await fetch(ENDPOINT);
    const obj = await response.json();
    return obj;
  } catch (error) {
    return new Error(error);
  }
};

export const fetchFoodAreas = async (value) => {
  let ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';
  if (!value) {
    ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  }
  try {
    const response = await fetch(`${ENDPOINT}${value}`);
    const obj = await response.json();
    return obj;
  } catch (error) {
    console.log(error);
  }
};

export default fetchAreas;
