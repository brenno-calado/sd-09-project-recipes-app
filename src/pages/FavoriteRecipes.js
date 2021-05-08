import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Header from '../components/Header';
import './Pages.css';
import Loading from '../components/Loading';
import Share from '../components/Share';

function FavoriteRecipes() {
  const [filter, setFilter] = useState('All');
  const [renderData, setRenderData] = useState([]);
  const data = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const render = filter === 'All' ? data : renderData;

  useEffect(() => {
    const getStr = async () => {
      await setRenderData(data.filter((element) => element.type === filter));
    };
    getStr();
  }, [filter]);

  function dataFiltered(e) {
    setFilter(e.target.value);
  }

  function unselectFavorite(id) {
    const dataFilter = data.filter((element) => element.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(dataFilter));
    setRenderData(dataFilter);
  }

  return (
    <div>
      <Header
        title="Receitas Favoritas"
      />
      <div>
        {!render ? <Loading /> : render.map((element, index) => (
          <div key={ element.id }>
            <Link
              to={ element.type === 'comida'
                ? `/comidas/${element.id}`
                : `/bebidas/${element.id}` }
            >
              <img
                className="recipe-img"
                alt="fav food"
                src={ element.image }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <div>
              <span
                data-testid={ `${index}-horizontal-top-text` }
              >
                {element.alcoholicOrNot.length > 0
                  ? element.alcoholicOrNot
                  : element.area}
                {' - '}
                {element.category}
              </span>
              <Link
                to={ element.type === 'comida'
                  ? `/comidas/${element.id}`
                  : `/bebidas/${element.id}` }
                style={ { textDecoration: 'none' } }
              >
                <span data-testid={ `${index}-horizontal-name` }>{element.name}</span>
              </Link>
              <div>
                <button
                  type="button"
                  onClick={ () => unselectFavorite(element.id) }
                >
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ blackHeartIcon }
                    alt="Favorite"
                  />
                </button>
                <Share
                  index={ index }
                  id={ element.id }
                  type={ element.type }
                />
              </div>
            </div>
          </div>
        ))}
        <div>
          <input
            name="nav-fav"
            type="radio"
            value="All"
            data-testid="filter-by-all-btn"
            onClick={ (e) => dataFiltered(e) }
            defaultChecked
          />
          <input
            name="nav-fav"
            type="radio"
            value="comida"
            data-testid="filter-by-food-btn"
            onClick={ (e) => dataFiltered(e) }
          />
          <input
            name="nav-fav"
            type="radio"
            value="bebida"
            data-testid="filter-by-drink-btn"
            onClick={ (e) => dataFiltered(e) }
          />
        </div>
      </div>
    </div>
  );
}

export default FavoriteRecipes;
