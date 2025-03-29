# frozen_string_literal: true

Rails.application.routes.draw do
  root "home#index"
  get "/about", to: "about#index"
  resources :posts, only: [:index]

  # Ensures React handles routing
  get "*path", to: "home#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
