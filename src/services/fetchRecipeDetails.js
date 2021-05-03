const checkEndpoint = (id, category) => (
  id !== null
    ? `https://www.the${category}db.com/api/json/v1/1/lookup.php?i=${id}`
    : `https://www.the${category}db.com/api/json/v1/1/search.php?s=`
);

const fetchRecipeDetails = async (id, category) => {
  try {
    const ENDPOINT = checkEndpoint(id, category);
    const foodType = category === 'meal' ? 'meals' : 'drinks';
    const output = await fetch(ENDPOINT)
      .then((response) => response.json());

    return output[foodType];
  } catch (error) {
    console.log(error);
  }
};

export default fetchRecipeDetails;
