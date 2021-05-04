const CountryList = async () => {
  try {
    const countryEndpoint = 'https://servicodados.ibge.gov.br/api/v1/localidades/paises?orderBy=nome';
    const data = await fetch(countryEndpoint);
    const result = await data.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
export default CountryList;
