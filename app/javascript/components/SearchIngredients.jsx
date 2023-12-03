import React, { useState, useEffect } from 'react';
import { Ingredient } from './Ingredient';
import { Recipe } from './Recipe';
import { RecipeIdea } from './RecipeIdea';

export function SearchIngredients() {
  const [ingredientQuery, setIngredientQuery] = useState('');
  const [recipeQuery, setRecipeQuery] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [recipeIdeas, setRecipeIdeas] = useState([]);
  const [instructions, setInstructions] = useState([{}]);

  useEffect(() => {
    (async () => {
      if (ingredientQuery.length === 0) {
        setIngredients([]);
        return;
      }

      const response = await fetch(`/api/ingredients/search?q=${ingredientQuery}`);
      const data = await response.json();
      setIngredients(data);
    })();
  }, [ingredientQuery]);

  useEffect(() => {
    (async () => {
      if (recipeQuery.length === 0) {
        setRecipeIdeas([]);
        return;
      }

      const response = await fetch(`/api/recipes/search_by_title?q=${recipeQuery}`);
      const data = await response.json();
      setRecipeIdeas(data);
    })();
  }, [recipeQuery]);

  useEffect(() => {
    if (selectedIngredients.length > 0) {
      fetchRecipes();
    }
  }, [selectedIngredients]);

  const fetchRecipes = async () => {
    const ingredientIdsParam = selectedIngredients.map(ingredient => `ingredient_ids[]=${ingredient.id}`).join('&');
    const response = await fetch(`/api/recipes/find_by_ingredients?${ingredientIdsParam}`);
    const data = await response.json();
    setRecipes(data);
  };

  const fetchInstructions = async (recipeId) => {
    const response = await fetch(`/api/recipe/${recipeId}/instructions`);
    const data = await response.json();
    setInstructions(prevInstructions => ({ ...prevInstructions, [recipeId]: data }));
  }

  const handleIngredientClick = (id) => {
    const ingredient = ingredients.find(ingredient => ingredient.id === id);
    setRecipeQuery('');
    setSelectedIngredients(prevIngredients => [...prevIngredients, ingredient]);
    setIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient.id !== id));
  };

  const handleRecipeIdeaClick = async (id) => {
    const response = await fetch(`/api/recipe/${id}/ingredients`);
    const data = await response.json();
    setIngredients(data);
  }

  const handleSelectedIngredientClick = (id) => {
    const ingredient = selectedIngredients.find(ingredient => ingredient.id === id);
    setSelectedIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient.id !== id));
    setIngredients(prevIngredients =>[...prevIngredients, ingredient]);
  };

  return (
    <div>
      <div>
        <h2>Search by ingredient</h2>
        <input
          type="text"
          value={ingredientQuery}
          onChange={(e) => setIngredientQuery(e.target.value)}
          placeholder="Search ingredients"
        />
        <h2>Search by recipe</h2>
        <input
          type="text"
          value={recipeQuery}
          onChange={(e) => setRecipeQuery(e.target.value)}
          placeholder="Search recipes"
        />
        {recipeIdeas.length > 0 && (      
          <div>
            <ul>
            {recipeIdeas.map((recipe) => (
              <RecipeIdea key={recipe.id} recipe={recipe} handleClick={handleRecipeIdeaClick} />
            ))}
            </ul>
          </div>
        )}
        </div>
        {ingredients.length > 0 && (
        <div>
        <h2>Pick your ingredients</h2>
        <ul>
          {ingredients.map((ingredient) => (
            <Ingredient key={ingredient.id} ingredient={ingredient} handleClick={handleIngredientClick} />
          ))}
        </ul>
      </div>)}
      {selectedIngredients.length > 0 && (
        <div>
          <h2>Selected ingredients</h2>
          <ul>
          {selectedIngredients.map((ingredient) => (
            <Ingredient key={ingredient.id} ingredient={ingredient} handleClick={handleSelectedIngredientClick} />
          ))}
          </ul>
        </div>
      )}
      {recipes.length > 0 && (      
        <div>
          <h2>Recipes</h2>
          <ul>
          {recipes.map((recipe) => (
            <Recipe key={recipe.id} recipe={recipe} handleClick={fetchInstructions} instructions={instructions} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
