const ERROR = 'ERROR';

const checkSearchType = (type, text, category) => {
  switch (type) {
  case 'Ingrediente':
    return `https://www.the${category}db.com/api/json/v1/1/filter.php?i=${text}`;
  case 'Nome':
    return `https://www.the${category}db.com/api/json/v1/1/search.php?s=${text}`;
  case 'Primeira Letra':
    return `https://www.the${category}db.com/api/json/v1/1/search.php?f=${text}`;
  default:
    return ERROR;
  }
};

const fetchRecipesData = async (type, text, category) => {
  try {
    const ENDPOINT = checkSearchType(type, text, category);

    if (ENDPOINT === ERROR) throw ERROR;

    const output = await fetch(ENDPOINT)
      .then((response) => response.json());

    const foodType = category === 'meal' ? 'meals' : 'drinks';
    return output[foodType];
  } catch (error) {
    console.log(error);
  }
};

export default fetchRecipesData;
