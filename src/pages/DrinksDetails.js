import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AlimentDetails from '../components/AlimentDetails';
import { fetchDrinksDetails, fetchFoodsRecomendation } from '../services/fetchAPI';

function DrinksDetails() {
  const sliceNumber = 9;
  const { pathname } = useLocation();
  const idDrink = pathname.slice(sliceNumber);

  const [data, setData] = useState([]);
  const [recomendation, setRecomendation] = useState();

  async function getData() {
    const { drinks } = await fetchDrinksDetails(idDrink);
    const recomendations = await fetchFoodsRecomendation();
    setRecomendation(recomendations);
    setData(drinks);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    data.length > 0
      ? <AlimentDetails data={ data } recomendation={ recomendation } />
      : <div>Loading...</div>);
}

export default DrinksDetails;
