class Artist < ApplicationRecord
    validates :name, length: { in: 1..30 }, presence: true
end
