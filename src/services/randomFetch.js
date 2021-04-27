const getRandom = async (page) => {
  let RANDOM_API = '';
  RANDOM_API = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  if (page === 'Foods') {
    RANDOM_API = 'https://www.themealdb.com/api/json/v1/1/random.php';
  }
  const promise = await fetch(RANDOM_API);
  const result = await promise.json();
  return result;
};

export default getRandom;
