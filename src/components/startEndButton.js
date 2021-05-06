import React from 'react';

export default function StartButton() {
  const fixed = {
    position: 'fixed',
    bottom: 0,
    right: 0,
  };
  return (
    <button
      style={ fixed }
      className="btn btn-info border border-info"
      type="button"
      data-testid="start-recipe-btn"
    >
      Começar receita
    </button>
  );
}
