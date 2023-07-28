class CreateAlbums < ActiveRecord::Migration[7.0]
  def change
    create_table :albums do |t|
      t.string :title, null: false, index: true
      t.references :artist, null: false
      t.integer :year, null: false
      t.date :date, null: false

      t.timestamps
    end
  end
end
