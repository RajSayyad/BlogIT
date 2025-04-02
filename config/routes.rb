# frozen_string_literal: true

Rails.application.routes.draw do
  root "home#index"
  resources :posts, only: [:index, :create, :show], param: :slug
  resources :categories, only: [:index, :create]

  # Ensures React handles routing
  get "*path", to: "home#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
