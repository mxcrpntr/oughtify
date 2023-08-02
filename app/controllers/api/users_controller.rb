class Api::UsersController < ApplicationController

    wrap_parameters include: User.attribute_names + ['password', 'birthDate']

    def create
        @user = User.new(user_params)
        if @user.save
            login(@user)
            render :show
        else
            render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        @user = User.find(params[:id])
        @user.queue = params[:user][:queue]
        if @user.save
            # debugger
            render :show
        else
            render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
    end


    private

    def user_params
        params.require(:user).permit(:email, :name, :password, :birth_date)
    end
    def user_params_sans_pw
        params.require(:user).permit(:email, :name, :birth_date, :queue, :playlist_ids)
    end
end
