# frozen_string_literal: true

Rails.application.routes.draw do
  root "home#index"
  get "/", to: "home#index", via: :all
end
