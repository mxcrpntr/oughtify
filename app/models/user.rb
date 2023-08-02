class User < ApplicationRecord
    before_validation :ensure_session_token

    has_secure_password
    # validates :queue, exclusion: { in: [nil] }
    validates :email, :name, :password_digest, :session_token, :birth_date, presence: true
    validates :email, :name, :session_token, uniqueness: true
    validates :name, length: { in: 1..30 }, format: { without: URI::MailTo::EMAIL_REGEXP, message:  "Name can't be an email" }
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :password, length: { in: 8..255 }, allow_nil: true

    has_one_attached :profile_image

    has_many :playlists,
        dependent: :destroy

    def self.find_by_credentials(credential,password)
        if credential =~ URI::MailTo::EMAIL_REGEXP
            user = User.find_by(email: credential)
        else
            user = User.find_by(name: credential)
        end
        if user && user.authenticate(password)
            return user
        else
            nil
        end
    end

    def generate_unique_session_token
        loop do
            session_token = SecureRandom.urlsafe_base64
            return session_token unless User.exists?(session_token: session_token)
        end
    end

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end

    def reset_session_token!
        self.session_token = generate_unique_session_token
        self.save!
        self.session_token
    end

    # def ensure_queue
    #     self.queue ||= [];
    # end

    # def validate_birth_date
    #     date_arr = self.birth_date.split("-").map{|str| str.to_i}
    #     year,month,day = date_arr
    #     return false if date_arr.length != 3
    #     return false if !(1900..Date.today.year).include?(year)
    #     if year == Date.today.year
    #         return false if !(1..Date.today.month).include?(month)
    #         if month == Date.today.month
    #             return false if !(1..Date.today.day).include?(day)
    #         end
    #     end
    #     return false if !(1..12).include?(month)
    #     if [1,3,5,7,8,10,12].include?(month)
    #         return false if !(1..31).include?(day)
    #     elsif [4,6,9,11].include?(month)
    #         return false if !(1..30).include?(day)
    #     else
    #         return false if day == 29 && (year % 4 != 0)
    #         return false if !(1..29).include?(day)
    #     end
    #     return true
    # end


end
