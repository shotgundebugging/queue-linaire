module Api
  class RecipesController < ApplicationController
    def find_by_ingredients
      ingredient_ids = recipe_params[:ingredient_ids].map(&:to_i)
      recipes = Recipe.with_ingredients(ingredient_ids)

      render json: recipes
    end

    def instructions
      recipe = Recipe.find(params[:id])
      instructions = recipe.recipe_instructions

      render json: instructions
    end

    def search_by_title
      recipes = Recipe.search_by_title(recipe_params[:q])

      render json: recipes
    end

    def ingredients
      ingredients = Recipe.find(params[:id]).ingredients.distinct

      render json: ingredients
    end

    private
      def recipe_params
        params.permit(:q, ingredient_ids: [])
      end
  end
end
