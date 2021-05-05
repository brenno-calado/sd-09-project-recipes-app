import React from 'react';
import Footer from '../../common/components/Footer';
import Header from '../../common/components/Header';

const UserProfile = () => (
  <div data-testid="test-profile">
    <Header title="Perfil" isSearchEnable={ false } />
    <Footer />
  </div>
);

export default UserProfile;
