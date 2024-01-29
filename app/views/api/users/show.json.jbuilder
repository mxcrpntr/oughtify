json.user do
  json.extract! @user, :id, :email, :name, :birth_date, :queue, :reverse_queue, :playlist_ids
end

playlists = @user.playlists

json.playlists do
  playlists.each do |playlist|
    json.set! playlist.id do
      json.extract! playlist, :id, :title, :user_id, :playlist_song_ids, :updated_at
      json.set! :image_url, playlist.image.url
    end
  end
end