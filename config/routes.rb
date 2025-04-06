# frozen_string_literal: true

Rails.application.routes.draw do
  root "home#index"
  resources :posts, only: [:index, :create, :show, :update, :destroy], param: :slug
  resources :categories, only: [:index, :create]
  resources :users, only: [:create]
  resources :sessions, only: [:create, :destroy]
  resources :organizations, only: [:index]

  # Ensures React handles routing
  get "*path", to: "home#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
