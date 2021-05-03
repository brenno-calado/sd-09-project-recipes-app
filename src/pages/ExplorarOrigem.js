import React, { useContext } from 'react';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RecipiesContext } from '../context/RecipiesContext';
import SearchBar from '../components/SearchBar';

function ExplorarOrigem() {
  const { showSearchBar } = useContext(RecipiesContext);
  return (
    <div>
      <Header title="Explorar Origem" showExplorerButton />
      { showSearchBar && <SearchBar isMealsPage /> }
    </div>
  );
}

export default ExplorarOrigem;
