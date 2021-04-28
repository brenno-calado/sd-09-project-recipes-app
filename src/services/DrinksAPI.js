export const getRandomDrink = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const data = await fetch(url);
  const result = await data.json();
  return result;
};
export default getRandomDrink;
