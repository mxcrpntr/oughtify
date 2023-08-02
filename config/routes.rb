Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :update]
    resource :session, only: [:show, :create, :destroy]
    resources :artists, only: [:index, :show]
    resources :albums, only: [:index, :show]
    resources :playlists, only: [:create, :index, :show, :update, :destroy]
    resources :playlist_songs, only: [:create, :update, :destroy]
  end

  get '*path', to: "static_pages#frontend_index"

end
