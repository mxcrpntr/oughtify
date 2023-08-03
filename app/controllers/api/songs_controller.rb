class Api::SongsController < ApplicationController

    def show
        @song = Song.find_by(id: params[:id])
        render :show # if @song
    end


    def search
        query = params[:query]
        @songs = Song
            .where('title ILIKE ?', "%#{query}%")
        @albums = Album
            .where('title ILIKE ?', "%#{query}%")
        @playlists = Playlist
            .where('title ILIKE ?', "%#{query}%")
        @artists = Artist
            .where('name ILIKE ?', "%#{query}%")
        @results = @songs + @albums + @playlists + @artists

        render :search

    end
end
