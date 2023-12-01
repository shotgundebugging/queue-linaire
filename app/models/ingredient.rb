class Ingredient < ApplicationRecord
  default_scope { where('recipe_count > ?', 0) }
  has_and_belongs_to_many :recipe_instructions

  class << self
    def search_suggestions(query)
      ingredients = if query.present?
                      where('LOWER(name) LIKE ?', "#{query.downcase}%")
                    else
                      all
                    end

      ingredients.order(recipe_count: :desc).limit(10)
    end
  end
end
