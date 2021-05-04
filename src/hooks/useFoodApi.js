import { useContext, useEffect, useState } from 'react';
import { context } from '../context';
import fetchApi from '../services';

const initialState = {
  searchTerm: '',
  option: '',
};

function useFoodApi() {
  const { foods, setFoods } = useContext(context);
  const [filter, setFilter] = useState(initialState);

  useEffect(() => {
    if (filter.option && filter.searchTerm) {
      fetchApi('food', filter.option, filter.searchTerm).then(
        (responseFoods) => {
          if (responseFoods.meals) setFoods(responseFoods.meals);
          else alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
        },
        (error) => console.log(error),
      );
    } else {
      setFoods([]);
    }
  }, [filter, setFoods]);

  return { foods, setFilter, filter };
}

export default useFoodApi;
