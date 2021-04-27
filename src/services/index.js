const getFoodResults = async (radioButton, searchInput) => {
  let type = 'i';
  let searchParameter = 'filter';
  if (radioButton === 'ingredientRadio') {
    type = 'i';
    searchParameter = 'filter';
  }
  if (radioButton === 'nameRadio') {
    type = 's';
    searchParameter = 'search';
  }
  if (radioButton === 'firstLetterRadio') {
    type = 'f';
    searchParameter = 'search';
  }
  const url = `https://www.themealdb.com/api/json/v1/1/${searchParameter}.php?${type}=${searchInput}`;
  const result = await fetch(url).then((response) => response.json());
  return result;
};

export default getFoodResults;
