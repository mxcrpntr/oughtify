json.albums do
    @albums.each do |album|
        json.set! album.id do
            json.extract! album, :id, :title, :artist_id, :song_ids
            json.set! :image_url, album.image.url
        end
    end
end