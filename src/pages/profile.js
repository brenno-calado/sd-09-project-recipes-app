import React from 'react';
import Footer from '../components/footer';
import Header from '../components/header';

export default function Profile() {
  return (
    <>
      <Header page="Perfil" />
      <div data-testid="page-title">Perfil</div>
      <Footer />
    </>
  );
}