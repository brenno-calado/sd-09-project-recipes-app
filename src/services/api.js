
const url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink';

const fetchDrinks = () => fetch(url)
  .then(response => response.json())

export default fetchDrinks;