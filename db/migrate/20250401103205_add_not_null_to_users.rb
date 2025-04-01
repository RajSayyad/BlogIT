# frozen_string_literal: true

class AddNotNullToUsers < ActiveRecord::Migration[7.1]
  def change
    change_column_null :users, :name, false
    change_column_null :users, :email, false
    add_index :users, :email, unique: true
    add_reference :users, :organization, foreign_key: true
  end
end
