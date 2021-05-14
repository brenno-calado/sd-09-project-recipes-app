import React from 'react';
import '../styles/components/Loading.css';

function Loading() {
  return (
    <div className="loading-container">
      <div data-testid="loading-message" className="loading" />
    </div>
  );
}

export default Loading;
