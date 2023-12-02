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

    private
      def recipe_params
        params.permit(ingredient_ids: [])
      end
  end
end
