import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explore() {
  const history = useHistory();
  const { pathname } = history.location;
  const { setTitle } = useContext(RecipesContext);

  const handleClickExploreFoods = () => {
    history.push('/explorar/comidas');
    setTitle('Explorar Comidas');
  };

  const handleClickExploreDrinks = () => {
    history.push('/explorar/bebidas');
    setTitle('Explorar Bebidas');
  };

  return (
    <div>
      <Header />
      { pathname === '/explorar' ? (
        <div>
          <button
            type="button"
            data-testid="explore-food"
            onClick={ handleClickExploreFoods }
          >
            Explorar Comidas
          </button>
          <br />
          <br />
          <button
            type="button"
            data-testid="explore-drinks"
            onClick={ handleClickExploreDrinks }
          >
            Explorar Bebidas
          </button>
        </div>) : null }
      <Footer />
    </div>
  );
}

export default Explore;
