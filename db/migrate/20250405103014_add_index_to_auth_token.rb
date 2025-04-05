# frozen_string_literal: true

class AddIndexToAuthToken < ActiveRecord::Migration[7.1]
  def change
    add_index :users, :authentication_token, unique: true
  end
end
