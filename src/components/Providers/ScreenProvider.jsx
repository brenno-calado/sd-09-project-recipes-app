import React, { useState } from 'react';
import { shape } from 'prop-types';
import { ScreenContext } from '../../context';

export default function ScreenProvider({ children }) {
  const [category, setCategory] = useState('meals');
  const [searchBarView, setSearchBarView] = useState(false);

  value = {
    values: {
      category,
      searchBarView,
    },
    actions: {
      toggleSearchBar() {
        setSearchBarView(!searchBarView);
      },
      switchCategory(category) {
        setCategory(category);
      },
    },
  };

  return (
    <ScreenContext.Provider value={ value }>
      {children}
    </ScreenContext.Provider>
  );
}

ScreenProvider.propTypes = {
  children: shape,
}.isRequired;
