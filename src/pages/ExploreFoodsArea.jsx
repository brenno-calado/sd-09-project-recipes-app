import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyContext from '../context/context';
import MainCards from '../components/MainCards';

function ExploreFoodsArea() {
  const { mealArea, setSearchFilter } = useContext(MyContext);
  const [optionValue, setOptionValue] = useState('All');
  // const MAX_NUMBER_12 = 12;

  useEffect(() => {
    if (optionValue && optionValue !== 'All') {
      setSearchFilter(optionValue);
    } else if (optionValue && optionValue === 'All') {
      return <MainCards />;
    }
  }, [optionValue]);

  return (
    <div>
      <Header title="Explorar Origem" />
      <main style={ { display: 'flex', flexDirection: 'column', alignItems: 'center' } }>
        <select
          data-testid="explore-by-area-dropdown"
          className="custom-select"
          style={ { marginTop: 15, width: 300 } }
        >
          <option value="All">All</option>
          {
            mealArea.map((area) => (
              <option
                value={ area.strArea }
                key={ area.strArea }
                data-testid={ `${area.strArea}-option` }
                onChange={ ({ target }) => setOptionValue(target.value) }
              >
                { area.strArea }
              </option>
            ))
          }
        </select>
        <MainCards />
      </main>
      <Footer />
    </div>
  );
}

export default ExploreFoodsArea;
