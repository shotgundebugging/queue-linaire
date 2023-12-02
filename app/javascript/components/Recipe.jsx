import React from 'react';
import { Instruction } from './Instruction';

export const Recipe = ({ recipe, handleClick, instructions }) => (
  <div key={recipe.id}>
    <h3>{recipe.title}</h3>
    <img src={recipe.image} alt={recipe.title} style={{ maxHeight: '150px', width: 'auto', objectFit: 'contain' }} />
    <button onClick={() => handleClick(recipe.id)}>Show instructions</button>
    {instructions[recipe.id] && instructions[recipe.id].map((instruction, index) => (
      <Instruction key={index} instruction={instruction} />
    ))}
  </div>
);
