import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import getPageTitle from '../services/pageTitles';
import paths from '../routes/paths';
import { getUserData } from '../services/storage';

const {
  DONE_RECIPES,
  FAVORITE_RECIPES,
  LOGIN,
} = paths;

const Profile = ({ match: { path } }) => {
  const { email } = getUserData();
  const history = useHistory();
  const handleQuit = () => {
    localStorage.clear();
    history.push(LOGIN);
  };

  return (
    <>
      <Header title={ getPageTitle(path) } />
      <section>
        <p data-testid="profile-email">{ email }</p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push(DONE_RECIPES) }
        >
          Receitas Feitas
        </button>

        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push(FAVORITE_RECIPES) }

        >
          Receitas Favoritas
        </button>

        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => handleQuit() }
        >
          Sair
        </button>
      </section>
      <Footer />
    </>
  );
};

export default Profile;

Profile.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};
