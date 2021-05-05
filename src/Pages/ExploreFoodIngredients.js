import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ExploreFoodIngredients() {
  const [ingredientNames, setNames] = useState([]);

  useEffect(() => {
    const twelve = 12;
    (async function ingredientApi() {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
        const data = await response.json();
        const dataNames = data.meals.slice(0, twelve);
        setNames([...dataNames]);
      } catch (error) {
        console.error(error);
      }
    }());
  }, []);

  const renderIngredients = () => (
    ingredientNames.map((names, index) => (
      <Link to="/comidas" key={ names.strIngredient }>
        <div
          data-testid={ `${index}-ingredient-card` }
        >
          {console.log(names)}
          <img
            src={ `https://www.themealdb.com/images/ingredients/${names.strIngredient}-Small.png` }
            alt={ `${names.strIngredient}-ingredients` }
            data-testid={ `${index}-card-img` }
          />
          <p
            data-testid={ `${index}-card-name` }
          >
            {`${names.strIngredient}`}
          </p>
        </div>
      </Link>
    ))
  );

  return (
    <div>{ renderIngredients() }</div>
  );
}

export default ExploreFoodIngredients;
