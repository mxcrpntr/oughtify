class Api::PlaylistsController < ApplicationController

    def create
        @playlist = Playlist.new(playlist_params)
        if @playlist.save
            render :show
        else
            render json: { errors: @playlist.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def index
        @playlists = Playlist.all
        render :index
    end

    def show
        @playlist = Playlist.find(params[:id])
        render :show
    end

    def update
        @playlist = Playlist.find(params[:id])
        if @playlist.update(playlist_params)
            render :show
        else
            render json: { errors: @playlist.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @playlist = Playlist.find(params[:id])
        @playlist.delete
    end

    private
    def playlist_params
        params.require(:playlist).permit(:title,:user_id,:public,:color)
    end
end
