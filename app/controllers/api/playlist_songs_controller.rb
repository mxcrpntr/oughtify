class Api::PlaylistSongsController < ApplicationController

    def create
        @playlist_song = PlaylistSong.new(playlist_params)
        if @playlist_song.save
            render :show
        else
            render json: { errors: @playlist_song.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        @playlist_song = PlaylistSong.find(params[:id])
        if @playlist_song.update(playlist_params)
            render :show
        else
            render json: { errors: @playlist_song.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @playlist = PlaylistSong.find(params[:id])
        @playlist.delete
    end

    private
    def playlist_song_params
        params.require(:playlist_song).permit(:playlist_id,:song_id,:song_number)
    end
end
