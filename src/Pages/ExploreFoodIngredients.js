import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ingredientAction } from '../action/FoodAndDrinkAction';
import Header from '../components/Header';
import FooterSpec from '../components/FooterSpec';

function ExploreFoodIngredients(props) {
  const [ingredientNames, setNames] = useState([]);
  const { setIngrendient } = props;

  useEffect(() => {
    const twelve = 12;
    (async function ingredientApi() {
      const response = await
      fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const data = await response.json();
      const dataNames = data.meals.slice(0, twelve);
      setNames([...dataNames]);
    }());
  }, []);

  const ingrendient = (value) => {
    setIngrendient(value);
  };

  const renderIngredients = () => (
    ingredientNames.map((names, index) => (
      <Link
        to="/comidas"
        onClick={ () => ingrendient(names.strIngredient) }
        key={ names.strIngredient }
      >
        <div
          data-testid={ `${index}-ingredient-card` }
        >
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
    <div>
      <Header titleHeader="Explorar Ingredientes" id="1" />
      <div>{ renderIngredients() }</div>
      <FooterSpec />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setIngrendient: (ingredient) => dispatch(ingredientAction(ingredient)),
});

ExploreFoodIngredients.propTypes = ({
  setIngrendient: PropTypes.func,
}).isRequired;

export default connect(null, mapDispatchToProps)(ExploreFoodIngredients);
