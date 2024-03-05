class Api::PlaylistSongsController < ApplicationController

    def create
        playlist_id = params[:playlist_song][:playlist_id]
        if params[:playlist_song].has_key?(:playlist_song_ids)
            songs_to_add = PlaylistSong.where(id: params[:playlist_song][:playlist_song_ids]).pluck(:song_id)
            songs_to_add.each do |song_id|
                @new_playlist_song = PlaylistSong.new(playlist_id: playlist_id, song_id: song_id)
                if !@new_playlist_song.save
                    render json: {errors: @new_playlist_song.errors.full_messages }, status: :unprocessable_entity
                end
            end
            render :show
        elsif params[:playlist_song].has_key?(:album_song_ids)
            songs_to_add = params[:playlist_song][:album_song_ids]
            songs_to_add.each do |song_id|
                @new_playlist_song = PlaylistSong.new(playlist_id: playlist_id, song_id: song_id)
                if !@new_playlist_song.save
                    render json: {errors: @new_playlist_song.errors.full_messages }, status: :unprocessable_entity
                end
            end
            render :show
        else
            @playlist_song = PlaylistSong.new(playlist_song_params)
            last_song_number = 0
            if PlaylistSong.where(playlist_id: playlist_id).exists?
                last_song_number = PlaylistSong.where(playlist_id: playlist_id).order(song_number: :asc).pluck(:song_number).last
            end
            song_number = params[:playlist_song].has_key?(:song_number) ? params[:playlist_song][:song_number] : last_song_number + 1
            if PlaylistSong.where(playlist_id: playlist_id, song_number: song_number).exists?
                playlist_songs_after = PlaylistSong.where(playlist_id: playlist_id).where("song_number >= ?", song_number).order(song_number: :desc)
                playlist_songs_after.each do |song_after|
                    new_number = song_after.song_number + 1
                    song_after.update(song_number: new_number)
                    # p new_number
                end
            end
            # p "hey"
            if @playlist_song.save
                render :show
            else
                render json: { errors: @playlist_song.errors.full_messages }, status: :unprocessable_entity
            end
        end
    end

    def update
        @playlist_song = PlaylistSong.find(params[:id])
        old_song_number = @playlist_song.song_number
        new_song_number = params[:playlist_song][:song_number].to_i
        if old_song_number != new_song_number
            playlist_id = @playlist_song.playlist_id
            song_id = @playlist_song.song_id
            # @playlist_song.delete
            @playlist_song.update(song_number: 0)
            if old_song_number < new_song_number
                affected_song_numbers = (old_song_number..new_song_number).to_a
                affected_songs = PlaylistSong.where(playlist_id: playlist_id, song_number: affected_song_numbers).order(song_number: :asc)
                affected_songs.each do |affected_song|
                    new_affected_song_number = affected_song.song_number - 1
                    affected_song.update(song_number: new_affected_song_number)
                end
            else
                affected_song_numbers = (new_song_number..old_song_number).to_a
                affected_songs = PlaylistSong.where(playlist_id: playlist_id, song_number: affected_song_numbers).order(song_number: :desc)
                affected_songs.each do |affected_song|
                    new_affected_song_number = affected_song.song_number + 1
                    affected_song.update(song_number: new_affected_song_number)
                end
            end
            @playlist_song.update(song_number: new_song_number)
            if @playlist_song.save
                render :show
            else
                render json: { errors: @playlist_song.errors.full_messages }, status: :unprocessable_entity
            end
        else
            if @playlist_song.update(playlist_song_params)
                render :show
            else
                render json: { errors: @playlist_song.errors.full_messages }, status: :unprocessable_entity
            end
        end

    end

    def destroy
        playlist_song = PlaylistSong.find(params[:id])
        previous_song_number = playlist_song.song_number
        playlist = Playlist.find(playlist_song.playlist_id)
        playlist_song.delete
        playlist.save
        playlist.playlist_songs.sort{ |a,b| a.song_number <=> b.song_number}.each_with_index do |playlist_song, index|
            if playlist_song.song_number != (index + 1)
                playlist_song.update(song_number: (index + 1))
            end
        end
        playlist.save
    end

    private
    def playlist_song_params
        params.require(:playlist_song).permit(:playlist_id,:song_id,:song_number,:playlist_song_ids,:album_song_ids)
    end
end
