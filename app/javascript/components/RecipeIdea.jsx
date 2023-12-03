import React from "react";

export const RecipeIdea = ({ recipe, handleClick }) => (
    <li key={recipe.id}>
    <button onClick={() => handleClick(recipe.id)}>
      {recipe.title}
    </button>
  </li>
);
