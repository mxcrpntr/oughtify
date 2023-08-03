json.songs do
    @songs.each do |song|
        json.set! song.id do
            json.extract! song, :id, :title, :album_id
            album = Album.find(song.album_id)
            json.set! :album_title, album.title
            json.set! :artist_id, album.artist_id
            json.set! :image_url, album.image.url
            artist = Artist.find(album.artist_id)
            json.set! :artist_name, artist.name
        end
    end
end

json.albums do
    @albums.each do |album|
        json.set! album.id do
            json.extract! album, :id, :title, :artist_id
            json.set! :image_url, album.image.url
            artist = Artist.find(album.artist_id)
            json.set! :artist_name, artist.name
        end
    end
end

json.artists do
    @artists.each do |artist|
        json.set! artist.id do
            json.extract! artist, :id, :name
            json.set! :image_url, artist.image.url
        end
    end
end

json.playlists do
    @playlists.each do |playlist|
        json.set! playlist.id do
            json.extract! playlist, :id, :title, :user_id
            json.set! :user_name, User.find(playlist.user_id).name
            json.set! :image_url, playlist.image.url
        end
    end
end