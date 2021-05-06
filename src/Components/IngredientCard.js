import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchFoodIng, fetchCocktailIng } from '../services/ApiRequest';
import {
  sendIngredients,
  requestApiMealsIngredient,
  requestApiCocktailsbyIngredient } from '../redux/actions';

function IngredientCard({ name, saveMealIng, saveCocktailIng, saveIng }) {
  const [ingredients, setIngredients] = useState([]);

  const getIngredients = useCallback(async () => {
    if (name === 'Comidas') {
      const response = await fetchFoodIng();
      setIngredients(response.meals);
    } else {
      const response = await fetchCocktailIng();
      setIngredients(response.drinks);
    }
  }, [name]);

  useEffect(() => {
    getIngredients();
  }, [getIngredients]);

  const foodIngredientList = () => {
    const maxIngredients = 11;
    return ingredients.map(
      (item, index) => (index <= maxIngredients
        && (
          <Link
            to="/comidas"
            onClick={ async () => {
              await saveIng(item.strIngredient1);
              saveMealIng(item.strIngredient);
            } }
          >
            <div
              data-testid={ `${index}-ingredient-card` }
              key={ item.strIngredient }
              role="link"
            >
              <img
                src={ name === 'Comidas'
                  ? `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png`
                  : `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png` }
                alt="ingredient"
                data-testid={ `${index}-card-img` }
              />
              <span
                data-testid={ `${index}-card-name` }
              >
                {item.strIngredient}
              </span>
            </div>
          </Link>
        )
      ),
    );
  };
  const drinkIngredientList = () => {
    const maxIngredients = 11;
    return ingredients.map(
      (item, index) => (index <= maxIngredients
          && (
            <Link
              to="/bebidas"
              onClick={ async () => {
                await saveIng(item.strIngredient1);
                saveCocktailIng(item.strIngredient1);
              } }
            >
              <div
                data-testid={ `${index}-ingredient-card` }
                key={ item.strIngredient1 }
                role="link"
              >
                <img
                  src={ `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png` }
                  alt="ingredient"
                  data-testid={ `${index}-card-img` }
                />
                <span
                  data-testid={ `${index}-card-name` }
                >
                  {item.strIngredient1}
                </span>
              </div>
            </Link>
          )
      ),
    );
  };
  return (
    name === 'Comidas' ? foodIngredientList() : drinkIngredientList()
  );
}

const mapDispatchToProps = (dispatch) => ({
  saveMealIng: (ingredient) => dispatch(requestApiMealsIngredient(ingredient)),
  saveCocktailIng: (ingredient) => dispatch(requestApiCocktailsbyIngredient(ingredient)),
  saveIng: (ingredient) => dispatch(sendIngredients(ingredient)),
});

export default connect(null, mapDispatchToProps)(IngredientCard);
