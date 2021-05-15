import React, { useContext, useEffect } from 'react';
import { Header, Categories, Main, Footer } from '../../components';
import { Context } from '../../context';
import { fecthByName } from '../../services/api';

function Drinks() {
  const { data, updateData } = useContext(Context);

  useEffect(() => {
    if (!data.drinks) { updateData(fecthByName('', false)); }
  }, [data, updateData]);

  if (!data) return <div>Loading...</div>;

  return (
    <section>
      <Header title="Bebidas" search />
      <Categories />
      <Main recipes={ data.drinks } />
      <Footer />
    </section>
  );
}

export default Drinks;
