export const getRandomFood = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const data = await fetch(url);
  const result = await data.json();
  return result;
};
export default getRandomFood;
