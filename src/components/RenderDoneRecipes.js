import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import '../css/DoneRecipes.css';

const RenderDoneRecipes = (props) => {
  const { list } = props;
  const [filteredList, setFilteredList] = useState([]);
  const [shareButton, setShareButton] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleClickFilter = ({ target }) => {
    const { innerText } = target;
    console.log(target.innerText);
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
    <div>
      { shareButton ? <p>Link copiado!</p> : null}
      <div className="buttonContainer">
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
          <div className="item-card" key={ index }>
            <Link to={ `/${item.type}s/${item.id}` }>
              <img
                src={ item.image }
                alt={ item.name }
                className="item-image"
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <h5 data-testid={ `${index}-horizontal-top-text` }>
              { item.alcoholicOrNot !== ''
                ? item.alcoholicOrNot : `${item.area} - ${item.category}` }
            </h5>
            <Link to={ `/${item.type}s/${item.id}` }>
              <h3 data-testid={ `${index}-horizontal-name` }>{ item.name }</h3>
            </Link>
            <button
              type="button"
              onClick={ handleShareButton }
            >
              <img
                src={ shareIcon }
                alt={ `${item.type}s/${item.id}` }
                data-testid={ `${index}-horizontal-share-btn` }

              />
            </button>
            <h6 data-testid={ `${index}-horizontal-done-date` }>{ item.doneDate }</h6>
            { item.tags.map((tag) => (
              <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                { tag }
              </p>
            ))}
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
