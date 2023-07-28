json.artist do
  json.extract! @artist, :id, :name, :bio
  json.set! :image_url, @artist.image.url
  json.set! :banner_url, @artist.banner_image.url
  json.albums do
      @artist.albums.each do |album|
          json.set! album.id do
              json.extract! album, :id, :title, :date
              json.set! :image_url, album.image.url
          end
      end
  end
  json.songs do
      @artist.songs.each do |song|
          json.set! song.id do
              json.extract! song, :id, :title, :length, :album_id, :plays, :number
          end
      end
  end
end