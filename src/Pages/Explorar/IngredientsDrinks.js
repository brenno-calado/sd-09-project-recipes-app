import React, { Component } from 'react';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import MenuInferior from '../../components/MenuInferior';

class IngredientsDrinks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      totalItens: 12,
      drinksIngredients: [],
    };

    this.fetchIngredientsDrinkApi = this.fetchIngredientsDrinkApi.bind(this);
  }

  componentDidMount() {
    this.fetchIngredientsDrinkApi();
  }

  async fetchIngredientsDrinkApi() {
    const fetchIngredients = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const ingredientsList = await fetch(fetchIngredients)
      .then((response) => response.json())
      .then((json) => json.drinks);
    this.setState({
      loading: false,
      drinksIngredients: [...ingredientsList],
    });
  }

  render() {
    const { totalItens, loading, drinksIngredients } = this.state;
    return (
      <div>
        <Header />
        <h2>Explorar ingredientes bebidas:</h2>
        <main>
          {loading ? <Loading /> : drinksIngredients
            .filter((_item, indexNumber) => indexNumber < totalItens)
            .map((item, indexNumber) => (
              <div
                key={ item.strIngredient1 }
                data-testid={ `${indexNumber}-ingredient-card` }
                className="ingredient-card"
              >
                <img
                  src={ `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png` }
                  alt={ item.strIngredient1 }
                  data-testid={ `${indexNumber}-card-img` }
                />
                <p data-testid={ `${indexNumber}-card-name` }>{item.strIngredient1}</p>
              </div>
            ))}
        </main>
        <MenuInferior />
      </div>
    );
  }
}
export default IngredientsDrinks;
