class CreatePlaylists < ActiveRecord::Migration[7.0]
  def change
    create_table :playlists do |t|
      t.string :title, null: false
      t.references :user, null: false, index: true
      t.boolean :public, null: false, default: true
      t.string :color, null: false, default: "#121212"

      t.timestamps
    end
  end
end
