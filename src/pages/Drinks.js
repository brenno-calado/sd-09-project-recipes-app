import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';

function Drinks() {
  const { showSearchBar } = useContext(RecipesContext);
  const history = useHistory();
  const { pathname } = history.location;

  return (
    <div>
      { pathname === '/bebidas' ? (
        <Header
          showSearchButton
          title="Bebidas"
        />
      ) : null }
      { showSearchBar && <SearchBar /> }
      {pathname === '/comidas' ? <Footer /> : null}
    </div>
  );
}

export default Drinks;
