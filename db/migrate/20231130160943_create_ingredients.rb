class CreateIngredients < ActiveRecord::Migration[7.1]
  def change
    create_table :ingredients do |t|
      t.string :name
      t.integer :recipe_count, default: 0

      t.timestamps
    end
  end
end
