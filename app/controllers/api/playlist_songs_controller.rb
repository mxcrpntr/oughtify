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
        playlist_song = PlaylistSong.find(params[:id])
        previous_song_number = playlist_song.song_number
        playlist = Playlist.find(playlist_song.playlist_id)
        playlist_song.delete
        playlist.playlist_song_ids.each do |playlist_song_id|
            updated_playlist_song = PlaylistSong.find(playlist_song_id)
            if updated_playlist_song.song_number > previous_song_number
                updated_playlist_song.song_number -= 1
                updated_playlist_song.save
            end
        end
    end

    private
    def playlist_song_params
        params.require(:playlist_song).permit(:playlist_id,:song_id,:song_number)
    end
end
