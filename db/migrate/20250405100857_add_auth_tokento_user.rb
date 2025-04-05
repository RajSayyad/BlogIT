# frozen_string_literal: true

class AddAuthTokentoUser < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :authentication_token, :string
  end
end
