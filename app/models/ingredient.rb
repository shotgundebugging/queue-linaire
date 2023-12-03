class Ingredient < ApplicationRecord
  default_scope { where('recipe_count > ?', 0) }
  has_and_belongs_to_many :recipe_instructions

  class << self
    def search_suggestions(query)
      where('LOWER(name) LIKE ?', "#{query.downcase}%").order(recipe_count: :desc).limit(10) if query.present?
    end
  end
end
