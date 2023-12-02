import React from 'react';

export const Ingredient = ({ ingredient, handleClick }) => (
  <li key={ingredient.id}>
    <button onClick={() => handleClick(ingredient.id)}>
      {ingredient.name}
    </button>
  </li>
);
