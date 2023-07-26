class CreateArtists < ActiveRecord::Migration[7.0]
  def change
    create_table :artists do |t|
      t.string :name, null: false, index: true
      t.text :bio
      t.timestamps
    end
  end
end
