import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import fetchRecipes from '../services/api';

function Foods() {
  const { showSearchBar, setDataFromApi,
    dataFromApi, setRestartRecipes, restartRecipes } = useContext(RecipesContext);
  const history = useHistory();
  const { pathname } = history.location;
  const getRecipes = async () => {
    const route = pathname.substr(1);
    setDataFromApi({ ...dataFromApi });
    const { meals } = await fetchRecipes(route);
    if (dataFromApi.recipes.length <= 0) {
      return setDataFromApi({ ...dataFromApi, recipes: meals });
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  if (restartRecipes === true) {
    getRecipes();
    setRestartRecipes(false);
  }

  return (
    <div>
      { pathname === '/comidas' ? (
        <Header
          showSearchButton
          title="Comidas"
        />
      ) : null }
      { showSearchBar && <SearchBar /> }
      <Cards route={ pathname } />
      {pathname === '/comidas' ? <Footer /> : null}
    </div>
  );
}

export default Foods;
