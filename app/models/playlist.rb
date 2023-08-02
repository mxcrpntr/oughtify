class Playlist < ApplicationRecord

    validates :title, :public, :color, presence: true
    validates :public, inclusion: {in: [true,false]}
    validates_format_of :color, with: /\A#?(?:[A-F0-9]{3}){1,2}\z/i
    
    has_one_attached :image

    has_many :playlist_songs,
        dependent: :destroy

    has_many :songs,
        through: :playlist_songs

    belongs_to :user
end
