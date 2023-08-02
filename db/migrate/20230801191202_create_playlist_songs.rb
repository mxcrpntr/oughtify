class CreatePlaylistSongs < ActiveRecord::Migration[7.0]
  def change
    create_table :playlist_songs do |t|
      t.references :playlist, null: false, index: true
      t.references :song, null: false, index: true
      t.integer :song_number, null: false

      t.timestamps
    end

    add_index :playlist_songs, [:playlist_id, :song_number], unique: true
  end
end
