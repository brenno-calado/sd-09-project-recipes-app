import React from 'react';
import { useHistory } from 'react-router';

function LogoutButton() {
  const history = useHistory();
  return (
    <button
      type="button"
      data-testid="profile-logout-btn"
      className="basic-btn"
      onClick={ () => {
        history.push('/');
        localStorage.clear();
      } }
    >
      Sair
    </button>
  );
}

export default LogoutButton;
