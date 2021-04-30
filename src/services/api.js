// https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}
// https://www.themealdb.com/api/json/v1/1/search.php?s={nome}
// https://www.themealdb.com/api/json/v1/1/search.php?f={primeira-letra}

const fetchApi = async (params) => {
  const paramsKey = Object.keys(params)[0];
  const query = paramsKey === 'i' ? 'filter' : 'search';
  const urlParams = Object.entries(params)[0].join('=');
  const url = `https://www.themealdb.com/api/json/v1/1/${query}.php?${urlParams}`;
  console.log(url);
  const request = await fetch(url);
  return request.json();
};

export default fetchApi;
