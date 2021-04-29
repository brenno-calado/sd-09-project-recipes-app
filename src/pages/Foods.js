import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';

function Foods() {
  const { showSearchBar } = useContext(RecipesContext);
  const history = useHistory();
  const { pathname } = history.location;
  return (
    <div>
      { pathname === '/comidas' ? (
        <Header
          showSearchButton
          title="Comidas"
        />
      ) : null }
      { showSearchBar && <SearchBar /> }
      {pathname === '/comidas' ? <Footer /> : null}
    </div>
  );
}

export default Foods;
