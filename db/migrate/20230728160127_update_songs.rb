class UpdateSongs < ActiveRecord::Migration[7.0]
  def change
    add_index :songs, [:album_id, :number], unique: true
  end
end
