import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import getFoodsAndDrinks from '../services/servicesAPI';
import { filterFoodByArea, listMeals } from '../actions';

import Footer from '../components/footer';
import Header from '../components/header';
import CardContainer from '../components/cardContainer';

export default function ExploreFoodByOrigin() {
  const [areas, setAreas] = useState([]);
  const [areaSelected, setAreaSelected] = useState('');
  const [recipes, setRecipes] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (areas.length === 0) {
      const fetchDispatch = async () => {
        const fetch = await getFoodsAndDrinks('meals', 'getOrigin');
        dispatch(filterFoodByArea(fetch));
      };
      fetchDispatch();
    }
  }, [areas.length, dispatch]);

  const areaData = useSelector((state) => state.recipesReducer.filterByArea);

  useEffect(() => {
    if (areaData.length > 0) {
      const firstArea = areaData[0].strArea;

      setAreas(areaData);
      setAreaSelected(firstArea);
    }
  }, [areaData]);

  useEffect(() => {
    if (areaSelected) {
      const fetchDispatch = async () => {
        const fetch = await getFoodsAndDrinks('meals', 'filterByArea', areaSelected);
        dispatch(listMeals(fetch));
      };
      fetchDispatch();
    }
  }, [areaSelected, dispatch]);

  const filterAreaData = useSelector((state) => state.recipesReducer.meals);

  useEffect(() => {
    setRecipes(filterAreaData);
  }, [filterAreaData]);

  return (
    <>
      <Header
        page="Explorar Origem"
        search={ { searchBtn: true, searchFor: 'meals' } }
      />
      <div className="explorerArea-wrapper">
        <select
          className="dropdown-toggle"
          data-testid="explore-by-area-dropdown"
          title={ (areaSelected)
            ? `Origem selecionada: ${areaSelected}`
            : 'Carregando...' }
        >
          {areas.length > 0 && areas.map(({ strArea }, index) => (
            <option
              key={ `dropdown-${index}` }
              as="button"
              data-testid={ `${strArea}-option` }
              onClick={ () => setAreaSelected(strArea) }
            >
              {strArea}
            </option>
          ))}
        </select>
        <CardContainer recipes={ recipes } path="/comidas" cardType="recipes" />
      </div>
      <Footer />
    </>
  );
}
