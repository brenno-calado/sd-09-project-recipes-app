import React, { useEffect, useState } from 'react';
import { fetchAreas, fetchFoods, fetchFoodByArea } from '../services/fetchAPI';
import Header from '../components/Header';
import FoodCardByArea from '../components/FoodCardByArea';
import Footer from '../components/Footer';

export default function ExploreFoodsByLocal() {
  const [areas, setAreas] = useState([]);
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    const getAreas = async () => {
      const nationalities = await fetchAreas();
      setAreas(nationalities);
    };

    const getMeals = async () => {
      const cardList = await fetchFoods();
      setFoodList(cardList);
    };

    getAreas();
    getMeals();
  }, []);

  const areaFilter = async (area) => {
    let areaList = [];
    if (area === 'all') {
      areaList = await fetchFoods();
    } else {
      const response = await fetchFoodByArea(area);
      areaList = { meals: response };
    }
    setFoodList(areaList);
  };

  if (foodList && foodList.meals) {
    return (
      <>
        <Header title="Explorar Origem" />
        <main>
          <section>
            <select
              data-testid="explore-by-area-dropdown"
              onChange={ ({ target }) => areaFilter(target.value) }
            >
              <option value="all" key="all" data-testid="All-option">All</option>
              {areas.map((nationality) => (
                <option
                  key={ nationality.strArea }
                  value={ nationality.strArea }
                  data-testid={ `${nationality.strArea}-option` }
                >
                  {nationality.strArea}
                </option>
              ))}
            </select>
          </section>
          <FoodCardByArea list={ foodList.meals } />
        </main>
        <Footer />
      </>
    );
  }
  return (
    <>
      <Header />
      <h1>Carregando...</h1>
      <Footer />
    </>
  );
}
