const detailsId = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const fetchDetails = async (id) => {
  const res = await fetch(`${detailsId}${id}`)
    .then((data) => data.json());
  console.log(res);
  return res;
};

export default fetchDetails;
