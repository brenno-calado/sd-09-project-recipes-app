export function addLocalStorageMeals(id, target, ingredients, setLocalRecipes) {
  const inProgressLocal = localStorage.getItem('inProgressRecipes');
  const objectDefault = {
    cocktails: { },
    meals: {
      [id]: [],
    },
  };
  if (!inProgressLocal) {
    localStorage.setItem('inProgressRecipes', JSON.stringify(objectDefault));
    setLocalRecipes(objectDefault);
  }
  const oldStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const { meals } = JSON.parse(localStorage.getItem('inProgressRecipes'));
  let inProgress = {};
  if (!meals[id]) {
    inProgress = {
      ...oldStorage,
      meals: {
        ...meals,
        [id]: [ingredients[target.id]],
      },
    };
  } else if (meals[id]) {
    inProgress = {
      ...oldStorage,
      meals: {
        ...meals,
        [id]: [...meals[id], ingredients[target.id]],
      },
    };
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  setLocalRecipes(inProgress);
}

export function removeLocalStorageMeals(id, target, ingredients, setLocalRecipes) {
  const { meals } = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const newProgress = meals[id].filter((item) => item !== ingredients[target.id]);
  const inProgress = {
    meals: {
      ...meals,
      [id]: newProgress,
    },
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  setLocalRecipes(inProgress);
}

export function addLocalStorageDrinks(id, target, ingredients, setLocalRecipes) {
  const objectDefault = {
    cocktails: {
      [id]: [],
    },
    meals: {
      [id]: [],
    },
  };
  if (!localStorage.getItem('inProgressRecipes')) {
    localStorage.setItem('inProgressRecipes', JSON.stringify(objectDefault));
    setLocalRecipes(objectDefault);
  }
  const oldStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const { cocktails } = JSON.parse(localStorage.getItem('inProgressRecipes'));
  let inProgress = {};
  if (!cocktails[id]) {
    inProgress = {
      ...oldStorage,
      cocktails: {
        ...cocktails,
        [id]: [ingredients[target.id]],
      },
    };
  } else if (cocktails[id]) {
    inProgress = {
      ...oldStorage,
      cocktails: {
        ...cocktails,
        [id]: [...cocktails[id], ingredients[target.id]],
      },
    };
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  setLocalRecipes(inProgress);
}

export function removeLocalStorageDrinks(id, target, ingredients, setLocalRecipes) {
  const { cocktails } = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const newProgress = cocktails[id].filter((item) => item !== ingredients[target.id]);
  const inProgress = {
    cocktails: {
      ...cocktails,
      [id]: newProgress,
    },
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  setLocalRecipes(inProgress);
}
