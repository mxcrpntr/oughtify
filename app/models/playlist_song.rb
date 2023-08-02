class PlaylistSong < ApplicationRecord

    before_validation :ensure_song_number

    validates :song_number, presence: true, uniqueness: {scope: :playlist_id}

    belongs_to :playlist

    belongs_to :song


    def ensure_song_number
        self.song_number ||= Playlist.find(self.playlist_id).playlist_song_ids.length + 1
    end
end
