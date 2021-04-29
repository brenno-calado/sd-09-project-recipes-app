import { useContext, useEffect, useState } from 'react';
import { context } from '../context';
import fetchApi from '../services';

const initialState = {
  searchTerm: '',
  option: '',
};

function useDrinkApi() {
  const { drinks, setDrinks } = useContext(context);
  const [filter, setFilter] = useState(initialState);
  useEffect(() => {
    if (filter.option && filter.searchTerm) {
      fetchApi('cocktail', filter.option, filter.searchTerm).then(
        (responseFoods) => {
          setDrinks(responseFoods.drinks);
        },
        (error) => console.log(error),
      );
    } else {
      setDrinks([]);
    }
  }, [setDrinks, filter]);

  return { drinks, setFilter, filter };
}

export default useDrinkApi;
