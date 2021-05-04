import React, { Component } from 'react';
import LoadingScreen from '../loadingScreen';

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      maxNumberItens: 12,
      foodsIngredients: [],
    };

    this.fetchIngredientsFromApi = this.fetchIngredientsFromApi.bind(this);
  }

  componentDidMount() {
    this.fetchIngredientsFromApi();
  }

  async fetchIngredientsFromApi() {
    const ingredientListUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const ingredientsList = await fetch(ingredientListUrl)
      .then((response) => response.json())
      .then((json) => json.drinks);
    this.setState({
      loading: false,
      foodsIngredients: [...ingredientsList],
    });
  }

  render() {
    const { maxNumberItens, loading, foodsIngredients } = this.state;
    return (
      <div>
        <header>Explorar Ingredientes</header>
        <h2>Explorar ingredientes de comidas:</h2>
        <main>
          {loading ? <LoadingScreen /> : foodsIngredients
            .filter((_item, indexNumber) => indexNumber < maxNumberItens)
            .map((item, indexNumber) => (
              <div
                key={ item.strIngredient1 }
                data-testid={ `${indexNumber}-ingredient-card` }
                className="ingredient-card"
              >
                <img
                  src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }
                  alt={ item.strIngredient1 }
                  data-testid={ `${indexNumber}-card-img` }
                />
                <p data-testid={ `${indexNumber}-card-name` }>{item.strIngredient1}</p>
              </div>
            ))}
        </main>
      </div>
    );
  }
}

export default index;
