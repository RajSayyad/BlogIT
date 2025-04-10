# frozen_string_literal: true

Rails.application.routes.draw do
  root "home#index"
  resources :posts, only: [:index, :create, :show, :update, :destroy], param: :slug do
    member do
      patch :toggle_bloggable
      put :upvote
      put :downvote
    end

    resource :postpdf, only: [:create], module: :post do
      get :download, on: :collection
    end

    collection do
      get :my_posts
    end
  end

  resources :categories, only: [:index, :create]
  resources :users, only: [:create]
  resources :sessions, only: [:create, :destroy]
  resources :organizations, only: [:index]

  # Ensures React handles routing
  get "*path", to: "home#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
