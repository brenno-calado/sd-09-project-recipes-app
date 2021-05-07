export const fetchAreas = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const request = await fetch(endpoint);
  const response = await request.json();

  return response.meals.map(({ strArea }) => strArea);
};

export const fetchByArea = async (area) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  const request = await fetch(endpoint);
  const response = await request.json();

  return response.meals;
};
