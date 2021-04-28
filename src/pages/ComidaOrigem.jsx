import React from 'react';
import '../styles/Header.css';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';

function ComidaOrigem() {
  return (
    <div>
      <Header page="Explorar Origem" />
      <BottomMenu />
    </div>
  );
}

export default ComidaOrigem;
