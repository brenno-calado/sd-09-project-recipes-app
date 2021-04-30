const fetchDrinksByID = async (id) => {
  const myDrink = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((data) => data.json());
  return myDrink.drinks;
};

export default fetchDrinksByID;
