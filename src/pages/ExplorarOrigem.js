import React, { useContext } from 'react';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RecipiesContext } from '../context/RecipiesContext';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';

function ExplorarOrigem() {
  const { showSearchBar } = useContext(RecipiesContext);
  return (
    <div>
      <Header title="Explorar Origem" showButton />
      { showSearchBar && <SearchBar isMealsPage /> }
      <Footer />
    </div>
  );
}

export default ExplorarOrigem;
