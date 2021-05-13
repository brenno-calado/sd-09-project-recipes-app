import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';
import HeaderFoods from '../components/HeaderFoods';
import BottomMenu from '../components/BottomMenu';
import styles from './profile.module.css';

function Profile() {
  const preEmail = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  function redirect({ target }) {
    const btnName = target.name;
    if (btnName === 'favoritas') {
      history.push('/receitas-favoritas');
    }
    if (btnName === 'feitas') {
      history.push('/receitas-feitas');
    }
  }

  function redirectClear() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className={ styles.profileContainer }>
      <HeaderFoods hasSearchBar={ false }>
        <h2 data-testid="page-title">Perfil</h2>
      </HeaderFoods>
      <ButtonGroup vertical className={ styles.profileBtn }>
        <Button
          variant="outline-danger"
          type="button"
          name="feitas"
          data-testid="profile-done-btn"
          onClick={ redirect }
        >
          Receitas Feitas
        </Button>
        <Button
          variant="outline-danger"
          type="button"
          name="favoritas"
          data-testid="profile-favorite-btn"
          onClick={ redirect }
        >
          Receitas Favoritas
        </Button>
        <Button
          variant="outline-danger"
          type="button"
          name="sair"
          data-testid="profile-logout-btn"
          onClick={ redirectClear }
        >
          Sair
        </Button>
      </ButtonGroup>
      <p
        className={ styles.email }
        data-testid="profile-email"
      >
        {preEmail && preEmail.email}
      </p>
      <BottomMenu />
    </div>
  );
}

export default Profile;
