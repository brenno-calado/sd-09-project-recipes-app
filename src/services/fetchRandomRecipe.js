const fetchRandomRecipe = async (type) => {
  try {
    const endpoint = await fetch(`https://www.the${type}db.com/api/json/v1/1/random.php`);
    const response = await endpoint.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default fetchRandomRecipe;
