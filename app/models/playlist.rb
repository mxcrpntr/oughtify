class Playlist < ApplicationRecord

    before_validation :ensure_title
    validates :title, :public, :color, presence: true
    validates :public, inclusion: {in: [true,false]}
    validates_format_of :color, with: /\A#?(?:[A-F0-9]{3}){1,2}\z/i

    
    has_one_attached :image

    has_many :playlist_songs,
        dependent: :destroy

    has_many :songs,
        through: :playlist_songs

    belongs_to :user

    def ensure_title
        self.title ||= "My Playlist ##{Playlist.where(user_id: self.user_id).size + 1}"
    end
end
