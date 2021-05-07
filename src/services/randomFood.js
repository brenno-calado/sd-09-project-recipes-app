const randomFoodApi = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default randomFoodApi;
