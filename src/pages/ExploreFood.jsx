import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import getRandom from '../services/randomFetch';

function ExploreFood() {
  const [randomNumber, setRandom] = useState('');
  const [isRedirect, setRedirect] = useState(false);
  const onclick = () => {
    setRedirect(true);
  };

  useEffect(() => {
    const randomFetch = async () => {
      const randomSetup = await getRandom('Foods');
      console.log(randomSetup);
      setRandom(randomSetup.meals[0].idMeal);
    };
    randomFetch();
  }, []);

  if (isRedirect && randomNumber) {
    return <Redirect to={ `/comidas/${randomNumber}` } />;
  }

  return (
    <div>
      <Header page="Explorar Comidas" />
      <Link to="/explorar/comidas/ingredientes">
        <button data-testid="explore-by-ingredient" type="button">
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button data-testid="explore-by-area" type="button">
          Por Local de Origem
        </button>
      </Link>
      <button data-testid="explore-surprise" type="button" onClick={ onclick }>
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreFood;
