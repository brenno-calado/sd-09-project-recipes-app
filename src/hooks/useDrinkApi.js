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
        (responseDrinks) => {
          if (responseDrinks.drinks) setDrinks(responseDrinks.drinks);
          else alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
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
