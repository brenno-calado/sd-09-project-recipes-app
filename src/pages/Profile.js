import React from 'react';
import HeaderFoods from '../components/HeaderFoods';

function Profile() {
  return (
    <>
      <HeaderFoods hasSearchBar={ false }>
        <h1 data-testid="page-title">Perfil</h1>
      </HeaderFoods>
      <h1>Perfil</h1>
    </>
  );
}

export default Profile;
