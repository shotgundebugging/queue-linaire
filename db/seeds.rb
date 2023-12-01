# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
#

require 'json'

File.open('data/ingredients.txt', 'r') do |f|
  f.each_line do |line|
    Ingredient.find_or_create_by(name: line.strip)
  end
end

file = File.read('data/recipes-en.json')
recipes_json = JSON.parse(file)

ingredients = Ingredient.all

recipes_json.each do |recipe_json|
  recipe = Recipe.find_or_create_by(
    title: recipe_json['title'],
    ratings: recipe_json['ratings'],
    image: recipe_json['image']
  )

  recipe_json.fetch('ingredients',[]).each do |instruction_description|
    matched_ingredients = ingredients.select { |ingredient| instruction_description.include?(ingredient.name) }

    if matched_ingredients.any?
      recipe_instruction = RecipeInstruction.find_or_create_by(
        recipe_id: recipe.id,
        description: instruction_description
      )

      matched_ingredients.each do |ingredient|
        recipe_instruction.ingredients << ingredient
        ingredient.increment!(:recipe_count)
      end
    end
  end
end
