class PlaylistSong < ApplicationRecord

    validates :song_number, presence: true, uniqueness: {scope: :playlist_id}

    belongs_to :playlist

    belongs_to :song
end
