class Api::SessionsController < ApplicationController


    def show
        if logged_in?
            @user = current_user
            render 'api/users/show'
        else
            render json: {user: nil}
        end
    end

    def create
        credential = params[:credential]
        password = params[:password]
        @user = User.find_by_credentials(credential,password)
        if @user
            login(@user)
            render 'api/users/show'
        else
            render json: { errors: ['The provided credentials were invalid.'] }, status: :unauthorized
        end
    end

    def destroy
        logout!
        render json: {message: "Success!"}
    end
end
