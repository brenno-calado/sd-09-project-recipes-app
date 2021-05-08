import React, { Component } from 'react';
import Header from '../../components/Header';
import Loading from '../../components/Loading';

class IngredientsFoods extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      totalItens: 12,
      foodsIngredients: [],
    };

    this.fetchIngredientsFoodApi = this.fetchIngredientsFoodApi.bind(this);
  }

  componentDidMount() {
    this.fetchIngredientsFoodApi();
  }

  async fetchIngredientsFoodApi() {
    const fetchIngredients = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    const ingredientsList = await fetch(fetchIngredients)
      .then((response) => response.json())
      .then((json) => json.meals);
    this.setState({
      loading: false,
      foodsIngredients: [...ingredientsList],
    });
  }

  render() {
    const { totalItens, loading, foodsIngredients } = this.state;
    return (
      <div>
        <Header />
        <h2>Explorar ingredientes comidas:</h2>
        <main>
          {loading ? <Loading /> : foodsIngredients
            .filter((_item, indexNumber) => indexNumber < totalItens)
            .map((item, indexNumber) => (
              <div
                key={ item.strIngredient }
                data-testid={ `${indexNumber}-ingredient-card` }
                className="ingredient-card"
              >
                <img
                  src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }
                  alt={ item.strIngredient }
                  data-testid={ `${indexNumber}-card-img` }
                />
                <p data-testid={ `${indexNumber}-card-name` }>{item.strIngredient}</p>
              </div>
            ))}
        </main>
      </div>
    );
  }
}

export default IngredientsFoods;
