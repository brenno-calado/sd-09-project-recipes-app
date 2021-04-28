const fetchDetails = async (id, type) => {
  if (type === 'food') {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json());
    return data;
  }
  if (type === 'drink') {
    const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json());
    return data;
  }
};

export default fetchDetails;
