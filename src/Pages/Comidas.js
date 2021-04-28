import React from 'react';
import { Link } from 'react-router-dom';

export default function Comidas() {
  return (
    <div>
      Comidas
      <Link to="/perfil">
        Perfil
      </Link>
    </div>
  );
}
