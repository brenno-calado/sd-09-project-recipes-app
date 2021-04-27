import React from 'react';
import { useHistory } from 'react-router';
import ProfileIcon from '../../../images/profileIcon.svg';

function ProfileButton() {
  const history = useHistory();
  return (
    <button
      type="button"
      className="main-buttons"
      data-testid="profile-top-btn"
      src="profileIcon"
      onClick={ () => history.push('/perfil') }
    >
      <img src={ ProfileIcon } alt="profile button" />
    </button>
  );
}

export default ProfileButton;
