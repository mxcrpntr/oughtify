class Api::AlbumsController < ApplicationController

    def show
        @album = Album.find_by(id: params[:id])
        render :show # if @album
    end
end
