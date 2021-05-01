import React, { useEffect, useState, useContext } from 'react';
import fetchApi from '../../services/index';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ListFoodCards from '../../components/ListFoodCards';
import { context } from '../../context';

export default function ExploreFoodArea() {
  const [areas, setAreas] = useState([]);
  const [selectArea, setSelectArea] = useState('');
  const [selector, setSelector] = useState('name');
  const { foods, setFoods } = useContext(context);

  useEffect(() => {
    fetchApi('food', 'areasList', '').then(((list) => setAreas(list.meals)));
  }, []);

  useEffect(() => {
    const lengthOfList = 12;
    fetchApi('food', selector, selectArea).then((res) => {
      const fetchFoods = res.meals
        .filter((food) => res.meals.indexOf(food) < lengthOfList);
      setFoods(fetchFoods);
    });
  }, [setFoods, selectArea, selector]);

  function createDropdown() {
    return areas.map((area) => (
      <option
        key={ area.strArea }
        data-testid={ `${area.strArea}-option` }
        value={ area.strArea }
      >
        {area.strArea}
      </option>
    ));
  }

  function handleChange({ target }) {
    const { value } = target;
    if (value === 'All') {
      setSelector('name');
      setSelectArea('');
    } else {
      setSelector('area');
      setSelectArea(value);
    }
  }

  return (
    <>
      <Header title="Explorar Origem" canFind />
      <div>
        <select data-testid="explore-by-area-dropdown" onChange={ handleChange }>
          <option
            key="all"
            data-testid="All-option"
            value="All"
          >
            All
          </option>
          {createDropdown()}
        </select>
        <ListFoodCards items={ foods } />
      </div>
      <Footer />
    </>
  );
}
