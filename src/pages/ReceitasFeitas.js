import React /* { useState } */ from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function ReceitasFeitas() {
  const index = '';
  const tagName = '';

  const doneRecipe = {
    type: 'Food',
    img: 'http://www.dulcerestaurantecolonial.com.br/wp-content/uploads/2020/03/Histo%CC%81ria-da-feijoada-dulce-restaurante.jpg',
    category: 'Food',
    recipeName: 'Feijoada',
    date: '10/10/10',
    tag1: 'bun',
    tag2: 'baking',
    link: 'www.blbala',
  };

  const recipeArr = [];

  recipeArr.push(doneRecipe);
  localStorage.setItem('recipe', JSON.stringify(recipeArr));
  const localData = JSON.parse(localStorage.getItem('recipe'));

  // const [button, setButton] = useState();

  return (
    <div>
      <Header title="Receitas Feitas" searchIcon={ false } />
      <section>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </section>
      {
        localData.map((recipe) => (
          <div key="1">
            <div>
              <img
                src={ recipe.img }
                alt=""
                data-testid={ `${index}-horizontal-image` }
              />
            </div>
            <h4 data-testid={ `${index}-horizontal-top-text` }>{ recipe.category }</h4>
            <h1 data-testid={ `${index}-horizontal-name` }>
              { recipe.recipeName }
            </h1>
            <p data-testid={ `${index}-horizontal-done-date` }>
              { recipe.date }
            </p>
            <button
              type="button"
              onClick={ () => navigator.clipboard.writeText(recipe.link) }
              data-testid={ `${index}-horizontal-share-btn` }
            >
              <img src={ shareIcon } alt="compartilhar" />
            </button>
            <p data-testid={ `${index}-${tagName}-horizontal-tag` }>{ recipe.tag1 }</p>
            <p data-testid={ `${index}-${tagName}-horizontal-tag` }>{ recipe.tag2 }</p>
          </div>
        ))
      }
    </div>

  );
}

export default ReceitasFeitas;
