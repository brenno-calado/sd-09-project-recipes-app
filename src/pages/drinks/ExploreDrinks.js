import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGlobeAmericas } from 'react-icons/fa';
import { BsDropletFill } from 'react-icons/bs';
import { Header, Footer } from '../../components';
import { fetchRandomRecipe } from '../../services/api';
import '../../css/Explore.css';

function ExploreDrinks() {
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => setData(await fetchRandomRecipe(false));
    getData();
  }, []);

  const createButton = (testid, text) => (
    <button data-testid={ testid } type="button">{ text }</button>
  );

  if (!data.drinks) return <div>Loading...</div>;

  return (
    <section>
      <Header title="Explorar Bebidas" />
      <div className="buttons-explore-container">
        <Link to="/explorar/bebidas/ingredientes">
          <BsDropletFill className="icon-btn" />
          <div className="box-title-button">
            { createButton('explore-by-ingredient', 'Por Ingredientes') }
            <p className="subtitle">Faça buscas de bebidas por tipos de ingredients.</p>
          </div>
        </Link>
        <Link to={ `/bebidas/${data.drinks[0].idDrink}` }>
          <FaGlobeAmericas className="icon-btn" />
          <div className="box-title-button">
            { createButton('explore-surprise', 'Me Surpreenda!') }
            <p className="subtitle">Já bebeu essa aqui?</p>
          </div>
        </Link>
      </div>
      <Footer />
    </section>
  );
}

export default ExploreDrinks;
