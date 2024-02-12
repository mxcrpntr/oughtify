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
        if params[:playlist].key?(:user_id) && @playlist.user_id == params[:playlist][:user_id]
            update_playlist_params = playlist_params.dup
            if params[:playlist].key?(:image_file_path)
                new_playlist_image = File.open(params[:playlist][:image_file_path])
                @playlist.image.attach(io: new_playlist_image, filename: `#{@playlist.title}_image.jpg`)
                update_playlist_params.delete(:image_file_path)
            end
            if @playlist.update(update_playlist_params)
                render :show
            else
                render json: { errors: @playlist.errors.full_messages }, status: :unprocessable_entity
            end
        else
            render json: { errors: "Unauthorized: Current user's id does not match playlist creator's id." }, status: :unauthorized
        end
    end

    def destroy
        @playlist = Playlist.find(params[:id])
        @playlist.delete
    end

    private
    def playlist_params
        params.require(:playlist).permit(:title,:user_id,:public,:color,:image_file_path)
    end
end
