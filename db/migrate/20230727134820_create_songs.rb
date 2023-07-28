class CreateSongs < ActiveRecord::Migration[7.0]
  def change
    create_table :songs do |t|
      t.string :title, null: false, index: true
      t.integer :length, null: false
      t.references :album, null: false
      t.integer :plays, null: false, default: 0
      t.integer :number, null: false

      t.timestamps
    end
  end
end
