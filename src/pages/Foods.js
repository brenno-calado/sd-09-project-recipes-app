/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import fetchRecipes from '../services/api';
import CategoryButtons from '../components/CategoryButtons';

function Foods() {
  const { showSearchBar, setDataFromApi, dataFromApi, categoryName,
    getCategoryName, restartRecipes, setRestartRecipes } = useContext(RecipesContext);

  const history = useHistory();
  const { pathname } = history.location;
  const route = pathname.substr(1);

  const getRecipes = async () => {
    setDataFromApi({ ...dataFromApi, loading: true });
    const { meals } = await fetchRecipes(route);
    setDataFromApi({ ...dataFromApi, recipes: meals, loading: false });
    if (dataFromApi.recipes.length <= 0) {
      setDataFromApi({ ...dataFromApi, recipes: meals });
    }
  };

  useEffect(() => {
    if (dataFromApi.recipes.length <= 0) {
      getRecipes();
      setRestartRecipes(false);
    }
  }, []);

  if (restartRecipes === true) {
    getRecipes();
    setRestartRecipes(false);
  }

  useEffect(() => {
    getCategoryName('comidas');
  }, [categoryName]);

  return (
    <div>
      { pathname === '/comidas' ? (
        <Header
          showSearchButton
          title="Comidas"
        />
      ) : null }
      { showSearchBar && <SearchBar /> }
      {pathname === '/comidas' ? (
        <CategoryButtons route={ route } categoryName={ categoryName } />
      ) : null }
      <Cards
        route={ pathname }
        categoryName={ categoryName }
        history={ history }
        pathname={ pathname }
      />
      {pathname === '/comidas' ? <Footer /> : null}
    </div>
  );
}

export default Foods;
