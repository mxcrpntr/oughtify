class Album < ApplicationRecord
    before_validation :ensure_date

    validates :title, length: { in: 1..60 }, presence: true
    validates :year, :date, presence: true 

    has_one_attached :image

    belongs_to :artist

    has_many :songs,
        dependent: :destroy

    def ensure_date
        self.date ||= Date.new(self.year)
    end
end
