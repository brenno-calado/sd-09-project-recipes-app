const fetchItemById = async (id, path) => {
  let ENDPOINT = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  if (path.includes('/bebidas')) {
    ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  }
  try {
    const response = await fetch(ENDPOINT);
    const obj = await response.json();
    return obj;
  } catch (error) {
    throw new Error(error);
  }
};

export default fetchItemById;
