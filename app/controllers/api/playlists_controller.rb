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
        # debugger
        params.require(:playlist).permit(:title,:user_id,:public,:color,:image_file)
        @playlist = Playlist.find(params[:id])
        if params[:playlist].key?(:user_id) && @playlist.user_id == params[:playlist][:user_id].to_i
            update_playlist_params = playlist_params.dup
            if params[:playlist].key?(:image_file)
                new_playlist_image = params[:playlist][:image_file]
                ext = new_playlist_image.original_filename.split(".").last
                # debugger
                @playlist.image.attach(io: new_playlist_image, filename: "#{@playlist.title}_image.#{ext}")
                update_playlist_params.delete(:image_file)
            end
            if @playlist.update(update_playlist_params)
                render :show
            else
                render json: { errors: @playlist.errors.full_messages }, status: :unprocessable_entity
            end
        else
            render json: { errors: "Unauthorized: Current user's id (#{params[:playlist][:user_id]}) does not match playlist creator's id (#{@playlist.user_id}). First condition is #{params[:playlist].key?(:user_id)} and second condition is #{@playlist.user_id == params[:playlist][:user_id].to_i}" }, status: :unauthorized
        end
    end

    def destroy
        @playlist = Playlist.find(params[:id])
        @playlist.delete
    end

    private
    def playlist_params
        params.require(:playlist).permit(:title,:user_id,:public,:color,:image_file)
    end
end
