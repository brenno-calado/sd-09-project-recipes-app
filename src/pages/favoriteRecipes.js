import React from 'react';
import Header from '../components/header';
import Card from '../components'

export default function Favorites() {
  return (
    <>
      <Header page="Receitas Favoritas" />
      <div>

      </div>
    </>
  );
}


// // a chave doneRecipes deve conter a seguinte estrutura:
// [{
//KEY   id: id-da-receita,
//   type: comida-ou-bebida,
//   area: area-da-receita-ou-texto-vazio,
//   category: categoria-da-receita-ou-texto-vazio,
//   alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
//TITLE   name: nome-da-receita,
//SRC   image: imagem-da-receita,
//   doneDate: quando-a-receita-foi-concluida,
//AREA   tags: array-de-tags-da-receita-ou-array-vazio
// }]
// a chave favoriteRecipes deve conter a seguinte estrutura:
// [{
//   id: id-da-receita,
//   type: comida-ou-bebida,
//   area: area-da-receita-ou-texto-vazio,
//   category: categoria-da-receita-ou-texto-vazio,
//   alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
//   name: nome-da-receita,
//   image: imagem-da-receita
// }]