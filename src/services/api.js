export const fetchApi = async (params) => {
  const paramsKey = Object.keys(params)[0];
  const domain = params.isFoodsPage ? 'meal' : 'cocktail';
  const ingredientsOrCategories = paramsKey === 'i' || paramsKey === 'c';
  const query = ingredientsOrCategories ? 'filter' : 'search';
  const urlParams = Object.entries(params)[0].join('=');
  const url = `https://www.the${domain}db.com/api/json/v1/1/${query}.php?${urlParams}`;
  const request = await fetch(url);
  return request.json();
};

export const genericFetch = async (foods) => {
  const apiName = foods ? 'meal' : 'cocktail';
  const endpoint = `https://www.the${apiName}db.com/api/json/v1/1/search.php?s=`;
  const response = await fetch(endpoint);
  return response.json();
};

export const categoriesFetch = async (foods) => {
  const apiName = foods ? 'meal' : 'cocktail';
  const endpoint = `https://www.the${apiName}db.com/api/json/v1/1/list.php?c=list`;
  const response = await fetch(endpoint);
  return response.json();
};
