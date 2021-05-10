import React from 'react';
import { createPortal } from 'react-dom';

const CopyMsg = () => (
  createPortal(
    <div className="copy-msg">
      Link copiado!
    </div>,
    document.body,
  )
);

export default CopyMsg;
