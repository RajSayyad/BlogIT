# frozen_string_literal: true

class AddIndexToSlug < ActiveRecord::Migration[7.1]
  def change
    add_index :posts, :slug, unique: true
  end
end
