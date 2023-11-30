class CreateRecipes < ActiveRecord::Migration[7.1]
  def change
    create_table :recipes do |t|
      t.string :title
      t.float :ratings
      t.string :image

      t.timestamps
    end
  end
end
