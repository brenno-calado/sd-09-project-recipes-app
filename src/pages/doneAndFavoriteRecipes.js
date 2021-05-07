import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getItemLocalStorage } from '../services/servicesLocalStorage';
import Header from '../components/header';
import Categories from '../components/categories';
import HorizontalCards from '../components/horizontalCards';

export default function DoneRecipes() {
  const { pathname } = useLocation();
  const [selectedButton, setSelectedButton] = useState('All');
  const [arrayOfRecipes, setArrayOfRecipes] = useState([]);
  const page = pathname === '/receitas-feitas' ? 'Receitas Feitas' : 'Receitas Favoritas';
  const storeKey = pathname === '/receitas-feitas' ? 'doneRecipes' : 'favoriteRecipes';
  const buttons = [{ strCategory: 'Food' }, { strCategory: 'Drink' }];

  useEffect(() => {
    const localStoreData = getItemLocalStorage(storeKey) || [];
    setArrayOfRecipes(localStoreData);
  }, [storeKey]);

  const handleFilter = (filter) => {
    const localStoreData = getItemLocalStorage(storeKey);
    if (filter === 'Food') {
      const food = localStoreData.filter(({ type }) => type === 'comida');
      setArrayOfRecipes(food);
    } else {
      const drink = localStoreData.filter(({ type }) => type === 'bebida');
      setArrayOfRecipes(drink);
    }
  };

  const handleUnfavorite = () => {
    const localStoreData = getItemLocalStorage(storeKey);
    setArrayOfRecipes(localStoreData);
  };

  const handleCategoryClick = (value) => {
    if (value !== 'All' && value !== selectedButton) {
      setSelectedButton(value);
      handleFilter(value);
      console.log(value);
    } else {
      const localStoreData = getItemLocalStorage(storeKey);
      setSelectedButton('All');
      setArrayOfRecipes(localStoreData);
    }
  };

  return (
    <>
      <Header page={ page } />
      <Categories
        categories={ buttons }
        selected={ selectedButton }
        page="favorites"
        callback={ handleCategoryClick }
      />
      <main>
        <HorizontalCards
          arrayOfRecipes={ arrayOfRecipes }
          filterCallback={ handleUnfavorite }
        />
      </main>
    </>
  );
}
