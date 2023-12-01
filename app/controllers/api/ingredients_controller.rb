module Api
  class IngredientsController < ApplicationController
    def search
      ingredients = Ingredient.search_suggestions(ingredient_params[:q])

      render json: ingredients
    end

    private
      def ingredient_params
        params.permit(:q)
      end
  end
end
