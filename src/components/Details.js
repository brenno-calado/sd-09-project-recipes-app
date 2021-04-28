import React from 'react';
import { connect } from 'react-redux';

class Details extends React.Component {
  render() {
    return (
      <p>ola</p>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
