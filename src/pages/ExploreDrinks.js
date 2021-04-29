import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreDrinks() {
  const [drink, setDrink] = useState({});
  const history = useHistory();

  const handleClickToIngredients = () => {
    history.push('/explorar/bebidas/ingredientes');
  };

  const drinksDetailsRandom = async () => {
    const requestDrink = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((response) => response.json()
        .then((myDrink) => myDrink.drinks[0]));
    setDrink(requestDrink);
  };
  console.log(drinksDetailsRandom());

  const handleClickToSurpriseMe = () => {
    history.push(`/bebidas/${drink.idDrink}`);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ handleClickToIngredients }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ handleClickToSurpriseMe }
      >
        Me Surpreenda!
      </button>

      <Header title="Explorar Bebidas" />
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
