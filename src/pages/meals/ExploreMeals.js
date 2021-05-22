import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCarrot, FaMapMarkerAlt, FaGlobeAmericas } from 'react-icons/fa';
import { Header, Footer } from '../../components';
import { fetchRandomRecipe } from '../../services/api';
import '../../css/Explore.css';

function ExploreMeals() {
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => setData(await fetchRandomRecipe(true));
    getData();
  }, []);

  const createButton = (testid, text) => (
    <button data-testid={ testid } type="button">{ text }</button>
  );

  if (!data.meals) return <div>Loading...</div>;

  return (
    <section>
      <Header title="Explorar Comidas" />
      <div className="buttons-explore-container">
        <Link to="/explorar/comidas/ingredientes">
          <FaCarrot className="icon-btn" />
          <div className="box-title-button">
            { createButton('explore-by-ingredient', 'Por Ingredientes') }
            <p className="subtitle">Faça buscas de pratos por tipos de ingredients.</p>
          </div>
        </Link>
        <Link to="/explorar/comidas/area">
          <FaMapMarkerAlt className="icon-btn" />
          <div className="box-title-button">
            { createButton('explore-by-area', 'Por Local de Origem') }
            <p className="subtitle">Faça buscas de pratos por seu local de origem.</p>
          </div>
        </Link>
        <Link to={ `/comidas/${data.meals[0].idMeal}` }>
          <FaGlobeAmericas className="icon-btn" />
          <div className="box-title-button">
            { createButton('explore-surprise', 'Me Surpreenda!') }
            <p className="subtitle">Ja viu essa comida aqui?</p>
          </div>
        </Link>
      </div>
      <Footer />
    </section>
  );
}

export default ExploreMeals;
