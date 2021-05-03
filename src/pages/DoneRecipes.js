import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import RenderDoneRecipes from '../components/RenderDoneRecipes';

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

  // css
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
  };

  useEffect(() => {
    getDoneListFromLocalStorage();
  }, []);

  if (loading) return (<p>Loading...</p>);
  return (
    <div style={ containerStyle }>
      <Header title="Receitas Feitas" />
      <RenderDoneRecipes list={ doneList } />
    </div>
  );
};

export default DoneRecipes;
