import React, { useState, useEffect } from 'react';

export function SearchIngredients() {
  const [query, setQuery] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/ingredients/search?q=${query}`);
      const data = await response.json();
      setIngredients(data);
    })();
  }, [query]);

  useEffect(() => {
  if (selectedIngredients.length > 0) {
    fetchRecipes();
  } else {
    setRecipes([]);
  }
  }, [selectedIngredients]);

  const fetchRecipes = async () => {
    const ingredientIdsParam = selectedIngredients.map(ingredient => `ingredient_ids[]=${ingredient.id}`).join('&');
    const response = await fetch(`/api/recipes/find_by_ingredients?${ingredientIdsParam}`);
    const data = await response.json();
    setRecipes(data);
  };

  const handleIngredientClick = (id) => {
    const ingredient = ingredients.find(ingredient => ingredient.id === id);
    setSelectedIngredients(prevIngredients => [...prevIngredients, ingredient]);
    setIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient.id !== id));
  };

  const handleSelectedIngredientClick = (id) => {
    const ingredient = selectedIngredients.find(ingredient => ingredient.id === id);
    setSelectedIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient.id !== id));
    setIngredients(prevIngredients =>[...prevIngredients, ingredient]);
  };

  return (
    <div>
      <div>
        <h2>Search Ingredients</h2>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search ingredients"
        />
        <ul>
          {ingredients.map((ingredient) => (
            <li key={ingredient.id}>
              <button onClick={() => handleIngredientClick(ingredient.id)}>
                ＋ {ingredient.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedIngredients.length > 0 && (
        <div>
          <h2>Your Ingredients</h2>
          <ul>
            {selectedIngredients.map((ingredient) => (
              <li key={ingredient.id}>
                <button onClick={() => handleSelectedIngredientClick(ingredient.id)}>
                  - {ingredient.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {recipes.length > 0 && (
      <div>
        <h2>Matching recipes</h2>
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} style={{ maxHeight: '150px', width: 'auto', objectFit: 'contain' }} />
          </div>
        ))}
      </div>
      )}
    </div>
  );
}

