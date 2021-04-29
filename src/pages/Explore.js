import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explore() {
  const history = useHistory();
  const { pathname } = history.location;

  const handleClickExploreFoods = () => {
    history.push('/explorar/comidas');
  };

  const handleClickExploreDrinks = () => {
    history.push('/explorar/bebidas');
  };

  return (
    <div>
      <Header title="Explorar" />
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
