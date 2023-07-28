class Artist < ApplicationRecord
    validates :name, length: { in: 1..60 }, presence: true

    has_one_attached :image
    has_one_attached :banner_image

    has_many :albums,
        dependent: :destroy

    has_many :songs,
        through: :albums
end
