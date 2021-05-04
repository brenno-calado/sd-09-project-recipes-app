import React from 'react';
import shareImg from '../images/shareIcon.svg';
import noFav from '../images/blackHeartIcon.svg';
// import { includes } from 'lodash-es';
// import yesFav from '../images/whiteHeartIcon.svg';

class DetalhesComida extends React.Component {
  constructor() {
    super();
    this.state = {
      recipeId: 53053,
      recipe: {},
    };

    this.ingredientHELL = this.ingredientHELL.bind(this);
  }

  componentDidMount() {
    this.fetchRecipe();
  }

  async fetchRecipe() {
    const { recipeId } = this.state;
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
      const responseJson = await response.json();
      const recipe = await responseJson.meals[0];
      console.log(recipe);
      this.setState({ recipe });
    } catch (error) {
      console.log(error);
    }
  }

  ingredientHELL(recipe) {
    const keys = Object.entries(recipe);
    const result = [];
    console.log(keys);
    const filteredIng = keys.filter((key) => key[0].includes('strIngredient'));
    const filteredMeasures = keys.filter((key) => key[0].includes('strMeasure'));
    for (let i = 0; i < filteredIng.length; i += 1) {
      if (filteredIng[i][1] === '' || filteredIng[i][1] === null) {
        filteredIng.splice(i, 1);
        filteredMeasures.splice(i, 1);
        i -= 1;
      }
    }
    console.log(filteredIng);
    console.log(filteredMeasures);
    for (let i = 0; i < filteredIng.length; i += 1) {
      result.push(
        `${filteredIng[i][1]} - ${filteredMeasures[i][1]}`,
      );
    }
    console.log(result);
    return (
      result.map((ing, index) => (
        <li
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ index }
        >
          { ing }
        </li>))
    );
  }

  render() {
    const { recipe } = this.state;
    console.log(recipe);
    return (
      <div>
        <img
          data-testid="recipe-photo"
          src={ recipe.strMealThumb }
          alt="imagem da comida"
        />
        <h1 data-testid="recipe-title">{ recipe.strMeal }</h1>
        <button data-testid="share-btn" type="button">
          <img src={ shareImg } alt="Share" />
        </button>
        <button data-testid="favorite-btn" type="button">
          <img src={ noFav } alt="Favorite" />
        </button>
        <h3 data-testid="recipe-category">{ recipe.strCategory }</h3>
        <h2>Ingredientes:</h2>
        <ul>
          { this.ingredientHELL(recipe) }
        </ul>
        <p data-testid="instructions">
          { recipe.strInstructions }
        </p>

        <video data-testid="video" width="320" height="240" controls muted>
          <source src={ recipe.strYoutube } type="video/mp4" />
        </video>

        {/* Receitas Recomendadas devera ser um componente separado. */}
        <button data-testid="start-recipe-btn" type="button">Iniciar Receita</button>
      </div>
    );
  }
}

export default DetalhesComida;
