const copy = require('clipboard-copy');

export const copyClipboard = (type, id) => {
  copy(`${window.location.origin}/${type}s/${id}`).then(() => {
    document.querySelector(`#spanShare${id}`).innerHTML = 'Link copiado!';
  });
};

export const resetSpanShare = (id) => {
  document.querySelector(`#spanShare${id}`).innerHTML = 'Copia URL';
};
