import React, { useState, useEffect } from 'react';

export function SearchIngredients() {
  const [query, setQuery] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/ingredients/search?q=${query}`);
      const data = await response.json();
      setIngredients(data);
    })();
  }, [query]);

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
    </div>
  );
}

