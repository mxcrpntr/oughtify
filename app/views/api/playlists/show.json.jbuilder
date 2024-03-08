playlist_songs = []
songs = []

album_images = @playlist.playlist_songs.map{|p_song| p_song.song.album.image.url}.uniq

json.playlist do
    json.extract! @playlist, :id, :title, :user_id, :playlist_song_ids, :color, :updated_at
    user = User.find(@playlist.user_id)
    json.set! :user_name, user.name
    json.set! :image_url, @playlist.image.url
    json.set! :album_images, album_images
    @playlist.playlist_song_ids.each { |playlist_song_id| playlist_songs << playlist_song_id }
end

date_fetched = DateTime.now

json.playlist_songs do
    playlist_songs.each do |playlist_song_id|
        json.set! playlist_song_id do
            playlist_song = PlaylistSong.find(playlist_song_id)
            json.extract! playlist_song, :id, :song_id, :song_number, :playlist_id, :created_at
            song = Song.find(playlist_song.song_id)
            album = Album.find(song.album_id)
            json.extract! song, :title, :length, :album_id
            json.set! :file_url, song.file.url
            json.set! :image_url, album.image.url
            json.set! :artist_id, album.artist_id
            json.set! :album_title, album.title
            artist = Artist.find(album.artist_id)
            json.set! :artist_name, artist.name
            json.set! :date_fetched, date_fetched
        end
    end
end
