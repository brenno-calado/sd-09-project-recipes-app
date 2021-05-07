import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import RenderDoneRecipes from '../components/RenderDoneRecipes';
import '../css/DoneRecipes.css';

const DoneRecipes = () => {
  const [doneList, setDoneList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDoneListFromLocalStorage = () => {
    const myList = JSON.parse(localStorage.getItem('doneRecipes'));
    if (myList) {
      setDoneList(myList);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDoneListFromLocalStorage();
  }, []);

  if (loading) return (<p>Loading...</p>);
  return (
    <div className="done-recipes-body">
      <Header title="Receitas Feitas" />
      <RenderDoneRecipes list={ doneList } />
    </div>
  );
};

export default DoneRecipes;
