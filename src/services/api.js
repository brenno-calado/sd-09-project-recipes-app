const FOOD = 'https://www.themealdb.com/api.php';
const DRINK = 'https://www.thecocktaildb.com/api.php';

export const apiFood = async () => {
  const api = await fetch(FOOD);
  const result = await api.json();
  return result;
};

export const apiDrink = async () => {
  const api = await fetch(DRINK);
  const result = await api.json();
  return result;
};
