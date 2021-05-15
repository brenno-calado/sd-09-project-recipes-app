import React, { useState, useEffect } from 'react';
import { Header, Footer, Main } from '../../components';
import { fetchAreaList, fecthByArea, fecthByName } from '../../services/api';

function MealsByArea() {
  const [data, setData] = useState([]);
  const [areas, setAreas] = useState();

  const handleChange = async ({ target: { value } }) => (
    value === 'All' ? setData(await fecthByName('', true))
      : setData(await fecthByArea(value, true))
  );

  useEffect(() => {
    const getAreas = async () => setAreas(await fetchAreaList(true));
    const getData = async () => setData(await fecthByName('', true));
    getAreas();
    getData();
  }, []);

  const createDropdown = (testid, id, options) => (
    <select data-testid={ testid } id={ id } onChange={ handleChange }>
      <option data-testid="All-option" value="All">All</option>
      { options.map(({ strArea: area }) => (
        <option data-testid={ `${area}-option` } id={ area } key={ area } value={ area }>
          { area }
        </option>)) }
    </select>
  );

  if (!areas) return <div>Loading...</div>;

  return (
    <section>
      <Header title="Explorar Origem" search />
      { createDropdown('explore-by-area-dropdown', 'explore-by-area', areas.meals) }
      <Main recipes={ data.meals } />
      <Footer />
    </section>
  );
}

export default MealsByArea;
