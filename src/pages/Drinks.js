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
<<<<<<< HEAD
  const { showSearchBar, setDataFromApi, dataFromApi,
    restartRecipes, setRestartRecipes } = useContext(RecipesContext);
=======
  const { showSearchBar, setDataFromApi, dataFromApi, categoryName,
    getCategoryName, restartRecipes, setRestartRecipes } = useContext(RecipesContext);

>>>>>>> 67c0045839e672f10bf0fb9bb10bcabdad9b3f66
  const history = useHistory();
  const { pathname } = history.location;
  const route = pathname.substr(1);

  const getRecipes = async () => {
<<<<<<< HEAD
    const route = pathname.substr(1);
    setDataFromApi({ ...dataFromApi });
    const { drinks } = await fetchRecipes(route);
    if (dataFromApi.recipes.length <= 0) {
      return setDataFromApi({ ...dataFromApi, recipes: drinks, loading: false });
=======
    setDataFromApi({ ...dataFromApi, loading: true });
    const { drinks } = await fetchRecipes(route);
    setDataFromApi({ ...dataFromApi, recipes: drinks, loading: false });
    if (dataFromApi.recipes.length === 0) {
      setDataFromApi({ ...dataFromApi, recipes: drinks });
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
    getCategoryName('bebidas');
  }, [categoryName]);

>>>>>>> 67c0045839e672f10bf0fb9bb10bcabdad9b3f66
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
        <CategoryButtons route={ route } categoryName={ categoryName } />
      ) : null }
      <Cards route={ pathname } history={ history } pathname={ pathname } />
      {pathname === '/bebidas' ? <Footer /> : null}
    </div>
  );
}

export default Drinks;
