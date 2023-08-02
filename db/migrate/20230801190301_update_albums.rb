class UpdateAlbums < ActiveRecord::Migration[7.0]
  def change
    add_column :albums, :color, :string, default: "#121212", null: false
  end
end
