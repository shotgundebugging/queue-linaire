class CreateRecipeInstruction < ActiveRecord::Migration[7.1]
  def change
    create_table :recipe_instructions do |t|
      t.references :recipe, null: false, foreign_key: true
      t.string :description

      t.timestamps
    end
  end
end
