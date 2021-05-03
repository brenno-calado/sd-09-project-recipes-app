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
      <div>
        <Link to="/explorar/comidas/ingredientes">
          <button
            data-testid="explore-by-ingredient"
            type="button"
            className="btns-explore"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button data-testid="explore-by-area" type="button" className="btns-explore">
            Por Local de Origem
          </button>
        </Link>
        <button
          className="btns-explore"
          data-testid="explore-surprise"
          type="button"
          onClick={ onclick }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFood;
