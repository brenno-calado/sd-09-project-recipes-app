import React, { useState, useEffect } from 'react';
// import '../styles/Header.css';
import '../css/pages/ReceitasFeitas.css';
import Header from '../components/Header';
import NavReceitasFeitas from '../components/NavReceitasFeitas';
import ContentDoneRecipes from '../components/ContentDoneRecipes';
import getDoneRecipes from '../services/getLocalStorageDoneRecipes';

function ReceitasFeitas() {
  const [meals, setMeals] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [drincks, setDrincks] = useState([]);

  useEffect(() => {
    console.log('mount');
    const tmp = getDoneRecipes();
    console.log(`tmp: ${tmp}`);
    setDoneRecipes(tmp);
  }, []);

  const handleClickButton = ({ target: { value } }) => {
    // const { value } = target;
    console.log(value);
    /* if () {
    } */
  };
  /* const handleClickButton = () => {
    console.log('clik');
  }; */

  const doneRecipesList = doneRecipes.map((recipes, index) => (
    <ContentDoneRecipes key={ recipes.id } recipes={ recipes } recipeIndex={ index } />
  ));
  console.log(doneRecipes);
  return (
    <div>
      <Header page="Receitas Feitas" hasSearchButton={ false } />
      <div className="done-recipes-container">
        <NavReceitasFeitas onclick={ handleClickButton } />
        { doneRecipesList }
      </div>
    </div>
  );
}

export default ReceitasFeitas;
