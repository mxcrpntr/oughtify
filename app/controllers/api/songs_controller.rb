class Api::SongsController < ApplicationController

    def show
        @song = Song.find_by(id: params[:id])
        render :show # if @song
    end
end
