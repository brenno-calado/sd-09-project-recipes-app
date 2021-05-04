const fetchIngredients = async (type) => {
  try {
    const request = await fetch(`https://www.the${type}db.com/api/json/v1/1/list.php?i=list`);
    const response = await request.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default fetchIngredients;
