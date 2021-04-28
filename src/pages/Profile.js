import React from 'react';
import HeaderFoods from '../components/HeaderFoods';
import BottomMenu from '../components/BottomMenu';

function Profile() {
  return (
    <>
      <HeaderFoods hasSearchBar={ false }>
        <h1 data-testid="page-title">Perfil</h1>
      </HeaderFoods>
      <h1>Perfil</h1>
      <BottomMenu />
    </>
  );
}

export default Profile;
