import React, { useState, useEffect } from 'react';
import Header2 from '../components/Header2';
import RenderFavFoods from '../components/RenderFavFoods';
import RenderFavDrinks from '../components/RenderFavDrinks';
import FiltersFavorites from '../components/FiltersFavorites';

function ExploreFavorites() {
  const [data, setData] = useState([]);

  function createLocalStorage() {
    const favoriteRecipes = 'favoriteRecipes';
    if (localStorage[favoriteRecipes] === undefined) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  }

  function renderElements() {
    return (
      <div>
        { console.log(data) }
        <Header2 title="Receitas Favoritas" />
        <FiltersFavorites data={ data } setData={ setData } />
        <div>
          { data.map((element, index) => {
            if (element.type === 'bebida') {
              return (<RenderFavDrinks
                key={ data.id }
                data={ element }
                index={ index }
                setData={ setData }
              />);
            }
            return (<RenderFavFoods
              key={ data.id }
              data={ element }
              index={ index }
              setData={ setData }
            />);
          })}
        </div>
      </div>
    );
  }

  useEffect(() => {
    renderElements();
  }, [data]);

  useEffect(() => {
    createLocalStorage();
    setData(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  if (data.length === 0) {
    return (
      <div>
        <Header2 title="Receitas Favoritas" />
        <FiltersFavorites data={ data } setData={ setData } />
      </div>);
  }

  return renderElements();
}

export default ExploreFavorites;
