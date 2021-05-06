import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

const clickLogout = (setLogout) => {
  localStorage.clear();
  setLogout(true);
};

const Profile = () => {
  const { email } = JSON.parse(localStorage.getItem('user'));
  const [logout, setLogout] = useState(false);
  console.log(email);
  return (
    <div>
      <Header title="Perfil" />
      <h3 data-testid="profile-email">{email}</h3>
      <Link to="/receitas-feitas">
        <Button data-testid="profile-done-btn">Receitas Feitas</Button>
      </Link>
      <Link to="/receitas-favoritas">
        <Button data-testid="profile-favorite-btn">Receitas Favoritas</Button>
      </Link>
      <Link to="/">
        <Button
          data-testid="profile-logout-btn"
          onClick={ () => clickLogout(setLogout) }
        >
          Sair
        </Button>
      </Link>
      {logout ? <Redirect to="/" /> : <span />}
      <BottomNav />
    </div>
  );
};

export default Profile;
