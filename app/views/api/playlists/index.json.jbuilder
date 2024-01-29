json.playlists do
    @playlists.each do |playlist|
        json.set! playlist.id do
            json.extract! playlist, :id, :title, :color, :user_id, :updated_at
            user = User.find(playlist.user_id)
            json.set! :user_name, user.name
            json.set! :image_url, playlist.image.url
        end
    end
end