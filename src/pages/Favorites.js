import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function Favorites() {
  const [urlCopied, setUrlCopied] = useState('');
  const [card, setCard] = useState('');
  const [filter, setFilter] = useState('All');
  const [renderData, setRenderData] = useState([]);
  const data = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const render = filter === 'All' ? data : renderData;

  useEffect(() => {
    setRenderData(data.filter((element) => element.type === filter));
  }, [filter, setRenderData]);

  function dataFiltered(e) {
    setFilter(e.target.value);
  }

  function unselectFavorite(id) {
    const dataFilter = data.filter((element) => element.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(dataFilter));
    setRenderData(dataFilter);
  }

  const onCopyText = () => {
    const timeout = 1000;
    setUrlCopied('Link copiado!');
    setTimeout(() => {
      setUrlCopied('');
    }, timeout);
  };

  const copyToClipBoard = async (id, element) => {
    setCard(id);
    onCopyText();
    switch (element) {
    case 'comida':
      await navigator.clipboard
        .writeText(`http://localhost:3000/comidas/${id}`);
      break;

    default:
      await navigator.clipboard
        .writeText(`http://localhost:3000/bebidas/${id}`);
      break;
    }
  };
  return (
    <div>
      <div className="btn-container">
        <input
          className="fav-nav-btn"
          name="nav-fav"
          type="radio"
          value="All"
          data-testid="filter-by-all-btn"
          onClick={ (e) => dataFiltered(e) }
          defaultChecked
        />
        <input
          className="fav-nav-btn"
          name="nav-fav"
          type="radio"
          value="comida"
          data-testid="filter-by-food-btn"
          onClick={ (e) => dataFiltered(e) }
        />
        <input
          className="fav-nav-btn"
          name="nav-fav"
          type="radio"
          value="bebida"
          data-testid="filter-by-drink-btn"
          onClick={ (e) => dataFiltered(e) }
        />
      </div>
      <div className="card-container">
        {
          render.map((element, index) => (
            <div className="fav-card" key={ element.id }>
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
              <div className="fav-wrap">
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
                <div className="fav-container-btn">
                  <button
                    type="button"
                    onClick={ () => unselectFavorite(element.id) }
                  >
                    <img
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      src={ blackHeartIcon }
                      alt="Favorite"
                      style={ {
                        width: '20px',
                      } }
                    />
                  </button>
                  <button
                    type="button"
                    onClick={ () => copyToClipBoard(element.id, element.type) }
                  >
                    <img
                      src={ shareIcon }
                      alt="compartilhar"
                      data-testid={ `${index}-horizontal-share-btn` }
                      style={ {
                        width: '20px',
                      } }
                    />
                  </button>
                  <span>{ card === element.id ? urlCopied : null }</span>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Favorites;
