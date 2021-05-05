import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import fetchRecipes from '../services/api';
import CategoryButtons from '../components/CategoryButtons';

function Drinks() {
  const { showSearchBar, setDataFromApi, dataFromApi,
    categoryName, getCategoryName } = useContext(RecipesContext);

  const history = useHistory();
  const { pathname } = history.location;
  const route = pathname.substr(1);

  const getRecipes = async () => {
    setDataFromApi({ ...dataFromApi, loading: true });
    const { drinks } = await fetchRecipes(route);
    setDataFromApi({ ...dataFromApi, recipes: drinks, loading: false });
  };

  useEffect(() => {
    getRecipes();
  }, []);

  useEffect(() => {
    getCategoryName('bebidas');
  }, [categoryName]);

  return (
    <div>
      { pathname === '/bebidas' ? (
        <Header
          showSearchButton
          title="Bebidas"
        />
      ) : null }
      { showSearchBar && <SearchBar /> }
      {pathname === '/bebidas' ? (
        <CategoryButtons route={ route } />
      ) : null }
      <Cards route={ pathname } />
      {pathname === '/bebidas' ? <Footer /> : null}
    </div>
  );
}

export default Drinks;
