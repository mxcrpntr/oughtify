json.album do
  json.extract! @album, :id, :title, :date
  json.set! :image_url, @album.image.url
  json.songs do
      @album.songs.each do |song|
          json.set! song.id do
              json.extract! song, :id, :title, :length, :album_id, :plays, :number
          end
      end
  end
end