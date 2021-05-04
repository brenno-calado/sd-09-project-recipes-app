import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AlimentsInProcess from '../components/AlimentsInProcess';
import { fetchDrinksDetails } from '../services/fetchAPI';

function ProcessDrinks() {
  const { pathname } = useLocation();
  const [data, setData] = useState('');
  const sliceMin = 9;
  const sliceMax = -12;
  const id = pathname.slice(sliceMin, sliceMax);
  async function fetchAPI() {
    const { drinks } = await fetchDrinksDetails(id);
    setData(drinks[0]);
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  return data === '' ? <div>Loading...</div> : <AlimentsInProcess data={ data } />;
}

export default ProcessDrinks;
