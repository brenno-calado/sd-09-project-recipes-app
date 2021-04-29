import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleCouldRedirectAction } from '../Redux/actions';

function Details({ toggleCouldRedirect }) {
  useEffect(() => {
    toggleCouldRedirect(false);
  });

  return (
    <div>
      Detalhes
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  toggleCouldRedirect: (bool) => dispatch(toggleCouldRedirectAction(bool)),
});

Details.propTypes = {
  toggleCouldRedirect: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Details);
