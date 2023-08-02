class Album < ApplicationRecord
    attr_accessor :length

    before_validation :ensure_date

    validates :title, length: { in: 1..60 }, presence: true
    validates :year, :date, :color, presence: true 
    validates_format_of :color, with: /\A#?(?:[A-F0-9]{3}){1,2}\z/i

    has_one_attached :image

    belongs_to :artist

    has_many :songs,
        dependent: :destroy

    def ensure_date
        self.date ||= Date.new(self.year)
    end
end
