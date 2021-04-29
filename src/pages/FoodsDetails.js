import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AlimentDetails from '../components/AlimentDetails';
import { fetchFoodsDetails, fetchDrinksRecomendation } from '../services/fetchAPI';

function FoodsDetails() {
  const sliceNumber = 9;
  const { pathname } = useLocation();
  const idFood = pathname.slice(sliceNumber);

  const [data, setData] = useState([]);
  const [recomendation, setRecomendation] = useState();

  async function getData() {
    const { meals } = await fetchFoodsDetails(idFood);
    const recomendations = await fetchDrinksRecomendation();
    setRecomendation(recomendations);
    setData(meals);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    data.length > 0
      ? <AlimentDetails data={ data } recomendation={ recomendation } />
      : <div>Loading...</div>);
}

export default FoodsDetails;
