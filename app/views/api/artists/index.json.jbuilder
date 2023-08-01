albums = []

songs = []

json.artists do
  @artists.each do |artist|
    json.set! artist.id do
        json.extract! artist, :id, :name, :bio, :album_ids
        json.set! :image_url, artist.image.url
        json.set! :banner_url, artist.banner_image.url
        artist.album_ids.each { |album_id| albums << album_id }
    end
  end
end

json.albums do
    albums.each do |album_id|
        json.set! album_id do
            album = Album.find(album_id)
            json.extract! album, :id, :title, :date, :song_ids
            json.image_url album.image.url
            album.song_ids.each { |song_id| songs << song_id }
        end
    end
end

json.songs do
    songs.each do |song_id|
        json.set! song_id do
            song = Song.find(song_id)
            json.extract! song, :id, :title, :length, :album_id, :plays, :number
        end
    end
end