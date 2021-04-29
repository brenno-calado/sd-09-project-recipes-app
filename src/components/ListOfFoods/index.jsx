import React, { useContext, useEffect } from 'react';
import { context } from '../../context';
import fetchApi from '../../services/index';

function ListOfFoods() {
  const { foods, setFoods } = useContext(context);

  useEffect(() => {
    // const data = fetchApi('food', 'name', '');
    // setFoods(data);
  });

  return (
    <>
      {
        (foods === undefined)
          ? <p>p</p>
          : console.log(foods)
      }
      <p>agora vai</p>
    </>
  );
}

export default ListOfFoods;
