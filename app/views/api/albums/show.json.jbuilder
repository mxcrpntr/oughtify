songs = []

json.album do
  json.extract! @album, :id, :title, :date, :song_ids, :artist_id, :length, :color
  json.set! :image_url, @album.image.url
  @album.song_ids.each { |song_id| songs << song_id }
end


json.songs do
    songs.each do |song_id|
        json.set! song_id do
            song = Song.find(song_id)
            json.extract! song, :id, :title, :length, :album_id, :plays, :number
            json.set! :file_url, song.file.url
        end
    end
end

artist = Artist.find(@album.artist_id)

json.artist do
    json.extract! artist, :id, :name, :bio, :album_ids
    json.set! :image_url, artist.image.url
end

more_albums = artist.album_ids.select { |album_id| album_id != @album.id }

json.more_albums do
    more_albums.each do |album_id|
        json.set! album_id do
            album = Album.find(album_id)
            json.extract! album, :id, :title, :date, :artist_id, :song_ids, :color
            json.image_url album.image.url
        end
    end
end