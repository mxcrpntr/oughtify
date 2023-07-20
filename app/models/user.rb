class User < ApplicationRecord
    before_validation :ensure_session_token

    has_secure_password
    validates :email, :name, :password_digest, :session_token, :birth_date, presence: true
    validates :email, :name, :session_token, uniqueness: true
    validates :name, length: { in: 1..30 }, format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :password, length: { in: 6..255 }, allow_nil: true

    def self.find_by_credentials(credential,password)
        if credential =~ URI::MailTo::EMAIL_REGEXP
            user = User.find_by(email: credential)
        else
            user = User.find_by(name: name)
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
end
