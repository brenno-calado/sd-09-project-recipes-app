const getRandom = async (query, page) => {
  let RANDOM_API = '';
  if (page === 'Foods') {
    RANDOM_API = 'https://www.themealdb.com/api/json/v1/1/random.php';
  }
  RANDOM_API = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const promise = await fetch(RANDOM_API);
  const result = await promise.json();
  return result;
};

export default getRandom;
