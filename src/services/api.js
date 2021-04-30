// https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}
// https://www.themealdb.com/api/json/v1/1/search.php?s={nome}
// https://www.themealdb.com/api/json/v1/1/search.php?f={primeira-letra}

// const AND_POINT_API = 'https://swapi-trybe.herokuapp.com/api/planets/';
// const getDataPlanetsStarWars = () => (
//   fetch(AND_POINT_API)
//     .then((response) => (
//       response
//         .json()
//         .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
//     ))
// );

const fetchApi = async ({ type, params }) => {
  const urlParams = Object.entries(params)[0].join('=');
  const url = `https://www.themealdb.com/api/json/v1/1/${type}.php?${urlParams}`;
};

export default fetchApi;
