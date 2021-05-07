const fetchApi = async (params) => {
  const paramsKey = Object.keys(params)[0];
  const domain = params.isFoodsPage ? 'meal' : 'cocktail';
  const query = paramsKey === 'i' ? 'filter' : 'search';
  const urlParams = Object.entries(params)[0].join('=');
  const url = `https://www.the${domain}db.com/api/json/v1/1/${query}.php?${urlParams}`;
  const request = await fetch(url);
  return request.json();
};

export default fetchApi;
