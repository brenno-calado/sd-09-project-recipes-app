export const fetchByIngredient = (ingredient) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => console.log(data));
};

export const fetchByName = (name) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => console.log(data));
};

export const fetchByFirstLetter = (firstLetter) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => console.log(data));
};
