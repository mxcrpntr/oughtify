class Artist < ApplicationRecord
    validates :name, length: { in: 1..30 }, presence: true

    has_one_attached :image
    has_one_attached :banner_image
end
