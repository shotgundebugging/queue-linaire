class Recipe < ApplicationRecord
  has_many :recipe_instructions
  has_many :ingredients, through: :recipe_instructions

  class << self
    def with_ingredients(ingredient_ids)
      joins(recipe_instructions: :ingredients)
        .where(ingredients: { id: ingredient_ids })
        .group('recipes.id')
        .having('COUNT(DISTINCT ingredients.id) >= ?', ingredient_ids.length)
        .limit(10)
    end

    def search_by_title(query)
      where('LOWER(title) LIKE ?', "%#{query.downcase}%").limit(10) if query.present?
    end
  end
end
