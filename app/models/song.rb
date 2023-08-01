class Song < ApplicationRecord
    validates :title, :length, :plays, :number, presence: true
    validates :title, length: { in: 1..60 }
    validates :number, uniqueness: {scope: :album_id}

    has_one_attached :file

    belongs_to :album
end
