export async function getRecipesByLocations(type, location) {
  const promise = await fetch(`https://www.${type}.com/api/json/v1/1/filter.php?a=${location}`);
  try {
    const data = await promise.json();
    if (data) {
      return data;
    }
  } catch (error) {
    return error.message;
  }
}

export async function getIngredients(type) {
  const promise = await fetch(`https://www.${type}.com/api/json/v1/1/list.php?i=list`);
  try {
    const data = await promise.json();
    if (data) {
      return data;
    }
  } catch (error) {
    return error.message;
  }
}

export async function getLocations(type) {
  const promise = await fetch(`https://www.${type}.com/api/json/v1/1/list.php?a=list`);
  try {
    const data = await promise.json();
    if (data) {
      return data;
    }
  } catch (error) {
    return error.message;
  }
}

export async function getRecipesRandom(type) {
  const promise = await fetch(`https://www.${type}.com/api/json/v1/1/random.php`);
  try {
    const data = await promise.json();
    if (data) {
      return data;
    }
  } catch (error) {
    return error.message;
  }
}

export async function getRecipesDrinksFilterByCategory(category) {
  const promise = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  try {
    const data = await promise.json();
    if (data) {
      return data;
    }
  } catch (error) {
    return error.message;
  }
}

export async function getRecipesFoodsFilterByCategory(category) {
  const promise = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  try {
    const data = await promise.json();
    if (data) {
      return data;
    }
  } catch (error) {
    return error.message;
  }
}

export async function getRecipesByCategory(type) {
  const promise = await fetch(`https://www.${type}.com/api/json/v1/1/list.php?c=list`);
  try {
    const data = await promise.json();
    if (data) {
      return data;
    }
  } catch (error) {
    return error.message;
  }
}

export async function getRecipes(type) {
  const promise = await fetch(`https://www.${type}.com/api/json/v1/1/search.php?s=`);
  try {
    const data = await promise.json();
    if (data) {
      return data;
    }
  } catch (error) {
    return error.message;
  }
}

export async function getRecipeByIngredient(ingredient) {
  const promise = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  try {
    const data = await promise.json();
    if (data) {
      return data;
    }
  } catch (error) {
    return error.message;
  }
}

export async function getRecipeByName(name) {
  const promise = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  try {
    const data = await promise.json();
    if (data) {
      return data;
    }
  } catch (error) {
    return error.message;
  }
}

export async function getRecipeByFirstLetter(firstLetter) {
  const promise = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  try {
    const data = await promise.json();
    if (data) {
      return data;
    }
  } catch (error) {
    return error.message;
  }
}

export async function getDrinkByIngredient(ingredient) {
  const promise = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  try {
    const data = await promise.json();
    if (data) {
      return data;
    }
  } catch (error) {
    return error.message;
  }
}

export async function getDrinkByName(name) {
  const promise = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  try {
    const data = await promise.json();
    if (data) {
      return data;
    }
  } catch (error) {
    return error.message;
  }
}

export async function getDrinkByFirstLetter(firstLetter) {
  const promise = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  try {
    const data = await promise.json();
    if (data) {
      return data;
    }
  } catch (error) {
    return error.message;
  }
}

export async function getFoodDetailsById(id) {
  const promise = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  try {
    const data = await promise.json();
    if (data) {
      return data;
    }
  } catch (error) {
    return error.message;
  }
}

export async function getDrinkDetailsById(id) {
  const promise = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  try {
    const data = await promise.json();
    if (data) {
      return data;
    }
  } catch (error) {
    return error.message;
  }
}

export async function getRecommendedDrink() {
  const promise = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  try {
    const data = await promise.json();
    if (data) {
      return data;
    }
  } catch (error) {
    return error.message;
  }
}

export async function getRecommendedFood() {
  const promise = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  try {
    const data = await promise.json();
    if (data) {
      return data;
    }
  } catch (error) {
    return error.message;
  }
}
