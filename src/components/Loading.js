import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => (
  <div className="loading">
    <Spinner animation="border" variant="secondary" />
    Loading...
  </div>
);

export default Loading;
