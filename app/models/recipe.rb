class Recipe < ApplicationRecord
  has_many :recipe_instructions
  has_many :ingredients, through: :recipe_instructions
end
