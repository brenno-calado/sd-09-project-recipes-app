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
<<<<<<< HEAD
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
=======
  const { showSearchBar, setDataFromApi, dataFromApi, categoryName,
    getCategoryName, restartRecipes, setRestartRecipes } = useContext(RecipesContext);

  const history = useHistory();
  const { pathname } = history.location;
  const route = pathname.substr(1);

  const getRecipes = async () => {
    setDataFromApi({ ...dataFromApi, loading: true });
    const { meals } = await fetchRecipes(route);
    setDataFromApi({ ...dataFromApi, recipes: meals, loading: false });
    if (dataFromApi.recipes.length === 0) {
      setDataFromApi({ ...dataFromApi, recipes: meals });
>>>>>>> 67c0045839e672f10bf0fb9bb10bcabdad9b3f66
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  if (restartRecipes === true) {
    getRecipes();
    setRestartRecipes(false);
  }

<<<<<<< HEAD
=======
  useEffect(() => {
    getCategoryName('comidas');
  }, [categoryName]);

>>>>>>> 67c0045839e672f10bf0fb9bb10bcabdad9b3f66
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
