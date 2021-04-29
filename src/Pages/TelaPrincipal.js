import React from 'react';
import { useLocation } from 'react-router';
import MealCard from '../components/MealCard';
import DrinkCard from '../components/DrinkCard';

export default function TelaPrincipal() {
  const { pathname } = useLocation();

  return (
    <div>
      {pathname === '/comidas' ? <MealCard /> : <DrinkCard /> }
    </div>
  );
}
