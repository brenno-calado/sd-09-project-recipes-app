import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import '../css/RenderDoneRecipes.css';

const RenderDoneRecipes = (props) => {
  const { list } = props;
  const [filteredList, setFilteredList] = useState([]);
  const [shareButton, setShareButton] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleClickFilter = ({ target }) => {
    const { innerText } = target;
    if (innerText === 'All') {
      setFilteredList(list);
    }
    if (innerText === 'Foods') {
      const myList = list.filter((item) => item.type === 'comida');
      setFilteredList(myList);
    }
    if (innerText === 'Drinks') {
      const myList = list.filter((item) => item.type === 'bebida');
      setFilteredList(myList);
    }
  };

  const handleShareButton = ({ target }) => {
    setShareButton(true);
    const { alt } = target;
    const myPath = `http://localhost:3000/${alt}`;
    navigator.clipboard.writeText(myPath);
  };

  useEffect(() => {
    setFilteredList(list);
    setLoading(false);
  }, [list]);

  if (loading) return (<p>Loading...</p>);
  return (
    <div className="render-recipes-done-container">
      { shareButton ? <p>Link copiado!</p> : null}
      <div className="filter-button-container">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleClickFilter }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ handleClickFilter }
        >
          Foods
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleClickFilter }
        >
          Drinks
        </button>
      </div>
      <div className="item-container">
        {/* cuidado */}
        { filteredList.map((item, index) => (
          <div className="render-recipes-done-card" key={ index }>

            {/* imagem */}
            <Link to={ `/${item.type}s/${item.id}` }>
              <img
                src={ item.image }
                alt={ item.name }
                className="render-recipes-done-image"
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <div>
              <div className="recipes-done-card-info">
                {/* Area + Categoria  ou teor alcolico */}
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                  className="recipes-done-category"
                >
                  { item.alcoholicOrNot !== ''
                    ? item.alcoholicOrNot : `${item.area} - ${item.category}` }
                </p>

                {/* nome com link */}
                <Link to={ `/${item.type}s/${item.id}` }>
                  <p
                    data-testid={ `${index}-horizontal-name` }
                    className="recipes-done-name"
                  >
                    { item.name }
                  </p>
                </Link>

                {/* Data que foi feita */}
                <p
                  data-testid={ `${index}-horizontal-done-date` }
                  className="recipes-done-date"
                >
                  {`Feita em ${item.doneDate}`}
                </p>
                { item.tags.length === 0 ? null : (
                  <div className="recipes-done-tags">
                    { item.tags.map((tag) => (
                      <p
                        key={ tag }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        { tag }
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Botao de dar share */}
            <button
              type="button"
              onClick={ handleShareButton }
              className="recipes-done-share-btn"
            >
              <img
                src={ shareIcon }
                alt={ `${item.type}s/${item.id}` }
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

RenderDoneRecipes.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default RenderDoneRecipes;
