import React from 'react';

export default function StartButton() {
  console.log('botao');
  const fixed = {
    position: 'fixed',
    bottom: 0,
    right: 0,
  };
  return (
    <button
      style={ fixed }
      type="button"
      data-testid="start-recipe-btn"
    >
      Começar receita
    </button>
  );
}
