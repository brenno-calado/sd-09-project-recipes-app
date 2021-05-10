const queryTypes = {
  i: 'filter',
  c: 'filter',
  s: 'search',
  f: 'search',
};

const getApiProperties = (params) => {
  const paramsKey = Object.keys(params)[0];
  return {
    domain: (params.isFoodsPage && 'meal') || 'cocktail',
    query: (params.isDetails && 'lookup')
      || (params.isList && 'list')
      || queryTypes[paramsKey],
    apiParams: Object.entries(params)[0].join('='),
  };
};

export const fetchApi = async (params) => {
  const { domain, query, apiParams } = getApiProperties(params);
  const url = `https://www.the${domain}db.com/api/json/v1/1/${query}.php?${apiParams}`;
  const request = await fetch(url);
  return request.json();
};

// Could use fetchApi({s: ''})
export const genericFetch = async (foods) => {
  const apiName = foods ? 'meal' : 'cocktail';
  const endpoint = `https://www.the${apiName}db.com/api/json/v1/1/search.php?s=`;
  const response = await fetch(endpoint);
  return response.json();
};

// Could use fetchApi({c: 'list', isList: true})
export const categoriesFetch = async (foods) => {
  const apiName = foods ? 'meal' : 'cocktail';
  const endpoint = `https://www.the${apiName}db.com/api/json/v1/1/list.php?c=list`;
  const response = await fetch(endpoint);
  return response.json();
};
