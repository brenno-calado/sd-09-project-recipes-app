import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Profile extends React.Component {
  render() {
    return (
      <div>
        <Header title="Perfil" />
        <p>Esta é a pagina de perfil.</p>
        <Footer />
      </div>
    );
  }
}

export default Profile;
