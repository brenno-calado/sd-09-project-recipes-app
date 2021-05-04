import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AlimentsInProcess from '../components/AlimentsInProcess';
import { fetchFoodsDetails } from '../services/fetchAPI';

function ProcessFoods() {
  const { pathname } = useLocation();
  const [data, setData] = useState('');
  const sliceMin = 9;
  const sliceMax = -12;
  const id = pathname.slice(sliceMin, sliceMax);
  async function fetchAPI() {
    const { meals } = await fetchFoodsDetails(id);
    setData(meals[0]);
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  return data === '' ? <div>Loading...</div> : <AlimentsInProcess data={ data } />;
}

export default ProcessFoods;
