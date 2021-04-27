import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import DoneRecipesButton from '../components/buttons/profile/DoneRecipesButton';
import FavoriteRecipesButton from '../components/buttons/profile/FavoriteRecipesButton';
import LogoutButton from '../components/buttons/profile/LogoutButton';

function Profile() {
  return (
    <div>
      <Header title="Perfil" />
      <h3>email@email.com</h3>
      <DoneRecipesButton />
      <FavoriteRecipesButton />
      <LogoutButton />
      <Footer />
    </div>
  );
}

export default Profile;
