import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchDrinks } from '../services/fetchAPI';

function PrincipalDrinks() {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    fetchDrinks(null, 'a').then((response) => setDrinks(response));
    console.log(drinks);
  }, []);

  const cardLimit = 12;
  const drinksMap = Object.values(drinks)[0];
  console.log(drinksMap);
  return (
    <div>
      <Header title="Bebidas" />
      {drinksMap && drinksMap.map((recipe, index) => {
        if (index < cardLimit) {
          return (
            <div key={ recipe.idDrink } data-testid={ `${index}-recipe-card` }>
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
