import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { getItemLocalStorage } from '../services/servicesLocalStorage';
import Header from '../components/header';
import Categories from '../components/categories';
import HorizontalCards from '../components/horizontalCards';

export default function DoneRecipes() {
  const { pathname } = useLocation();
  const [selectedButton, setSelectedButton] = useState('All');
  const page = pathname === '/receitas-feitas' ? 'Receitas Feitas' : 'Receitas Favoritas';
  const storeKey = pathname === '/receitas-feitas' ? 'doneRecipes' : 'favoriteRecipes';
  const localStoreData = getItemLocalStorage(storeKey);
  const buttons = [{ strCategory: 'Food' }, { strCategory: 'Drink' }];

  const handleCategoryClick = (value) => {
    if (value !== 'All' && value !== selectedButton) {
      setSelectedButton(value);
    } else {
      setSelectedButton('All');
    }
  };

  console.log(localStoreData);
  return (
    <>
      <Header page={ page } />
      <Categories
        categories={ buttons }
        selected={ selectedButton }
        callback={ handleCategoryClick }
      />
      <main>
        <HorizontalCards arrayOfRecipes={ localStoreData } />
      </main>
    </>
  );
}
