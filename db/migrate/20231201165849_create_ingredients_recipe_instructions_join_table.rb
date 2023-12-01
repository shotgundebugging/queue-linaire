class CreateIngredientsRecipeInstructionsJoinTable < ActiveRecord::Migration[7.1]
  def change
    create_table :ingredients_recipe_instructions, id: false do |t|
      t.bigint :ingredient_id, null: false
      t.bigint :recipe_instruction_id, null: false
    end

    add_foreign_key :ingredients_recipe_instructions, :ingredients
    add_foreign_key :ingredients_recipe_instructions, :recipe_instructions
  end
end
