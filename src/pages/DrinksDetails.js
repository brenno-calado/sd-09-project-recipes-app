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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const { drinks } = await fetchDrinksDetails(idDrink);
      console.log(drinks);
      const recomendations = await fetchFoodsRecomendation();
      setRecomendation(recomendations);
      setData(drinks);
      setLoading(false);
    }
    if (!data || !data.length) getData();
  }, [idDrink, data.length, data]);

  console.log('antes da 24', data);
  return (
    loading
      ? <div>Loading...</div>
      : <AlimentDetails data={ data } recomendation={ recomendation } />);
}

export default DrinksDetails;
