import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchDrinks } from '../services/fetchAPI';
import RecipeCategory from '../components/RecipeCategory';

function PrincipalDrinks() {
  const [drinks, setDrinks] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [filteredDrinks, setFilteredDrinks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const history = useHistory();

  function toggleFunc(category) {
    if (category === 'all') setToggle(false);
    else {
      setSelectedCategory(category);
      if (selectedCategory === category) {
        setToggle(false);
      } else {
        fetchDrinks('category', category)
          .then((response) => setFilteredDrinks(response));
      }
    }
  }

  function redirectToDetails(id) {
    history.push(`/bebidas/${id}`);
  }

  useEffect(() => {
    fetchDrinks(null, 'a').then((response) => setDrinks(response));
  }, []);

  const cardLimit = 12;
  const drinksMap = toggle ? Object.values(filteredDrinks)[0] : Object.values(drinks)[0];
  return (
    <div>
      <Header title="Bebidas" />
      <RecipeCategory type="drinks" toggleFunc={ toggleFunc } />
      {drinksMap && drinksMap.map((recipe, index) => {
        if (index < cardLimit) {
          return (
            <div
              key={ recipe.idDrink }
              data-testid={ `${index}-recipe-card` }
              onClick={ () => redirectToDetails(recipe.idDrink) }
              onKeyPress={ () => redirectToDetails(recipe.idDrink) }
              role="button"
              tabIndex="0"
              style={ { cursor: 'pointer' } }
            >
              <img
                src={ recipe.strDrinkThumb }
                alt="recipe"
                data-testid={ `${index}-card-img` }
              />
              <h3 data-testid={ `${index}-card-name` }>{ recipe.strDrink }</h3>
            </div>

          );
        }
        return 'drink';
      })}
      <Footer />
    </div>
  );
}

export default PrincipalDrinks;
