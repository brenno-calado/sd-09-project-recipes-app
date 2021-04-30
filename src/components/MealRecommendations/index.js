import React, { Component } from 'react';
import './Style.css';

class index extends Component {
  recipeBox(recipe, indexNumb) {
    const {
      strMealThumb = null,
      strDrinkThumb = null,
      strMeal = null,
      strDrink = null,
      strCategory = null,
      strAlcoholic = null,
    } = recipe;
    return (
      <div data-testid={ `${indexNumb}-recomendation-card` } className="recommended-box">
        <div
          className="recommended-box-image"
          style={
            { backgroundImage: `url(${strMealThumb || strDrinkThumb})` }
          }
        />
        {/* <img src={ strMealThumb || strDrinkThumb } alt="recipe" /> */}
        <p
          className="recommended-box-category"
        >
          {strCategory || strAlcoholic}
        </p>
        <p
          className="recommended-box-name"
          data-testid={ `${indexNumb}-recomendation-title` }
        >
          {strMeal || strDrink}

        </p>
      </div>
    );
  }

  render() {
    const { recommendations } = this.props;
    return (
      <div className="recommendations-box">
        {recommendations.map((drink, indexNumb) => this.recipeBox(drink, indexNumb))}
      </div>
    );
  }
}

export default index;
