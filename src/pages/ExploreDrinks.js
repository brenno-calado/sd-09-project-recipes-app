import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreDrinks() {
  const { setIdRecipes } = useContext(RecipesContext);
  const [drink, setDrink] = useState({});
  const history = useHistory();

  const handleClickToIngredients = () => {
    history.push('/explorar/bebidas/ingredientes');
  };

  useEffect(() => {
    const drinksDetailsRandom = async () => {
      const requestDrink = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then((response) => response.json()
          .then((myDrink) => myDrink.drinks[0]));
      setDrink(requestDrink);
    };

    drinksDetailsRandom();
  }, []);

  const handleClickToSurpriseMe = () => {
    history.push(`/bebidas/${drink.idDrink}`);
    setIdRecipes(drink.idDrink);
  };

  return (
    <div>
      <Header title="Explorar Bebidas" />
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
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
