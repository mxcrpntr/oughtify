json.playlists do
    @playlists.each do |playlist|
        album_images = playlist.playlist_songs.map{|p_song| p_song.song.album.image.url}.uniq
        json.set! playlist.id do
            json.extract! playlist, :id, :title, :color, :user_id, :updated_at
            user = User.find(playlist.user_id)
            json.set! :user_name, user.name
            json.set! :image_url, playlist.image.url
            json.set! :album_images, album_images
        end
    end
end