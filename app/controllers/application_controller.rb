class ApplicationController < ActionController::API

    protect_from_forgery with: :exception

    before_action :snake_case_params, :attach_authenticity_token

    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def login(user)
        session[:session_token] = user.reset_session_token!
    end

    def logout!
        current_user.reset_session_token!
        session[:session_token] = nil
        @current_user = nil
    end

    def logged_in?
        !!current_user
    end

    def require_logged_in
        unless logged_in?
            render json: { error: 'You must be logged in to do that'}
        end
    end

    def require_logged_out
        if logged_in?
            render json: { error: 'You must be logged out to do that'}, status: 403
        end
    end
end
