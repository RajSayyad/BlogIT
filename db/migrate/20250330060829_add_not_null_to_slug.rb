# frozen_string_literal: true

class AddNotNullToSlug < ActiveRecord::Migration[7.1]
  def change
    change_column_null :posts, :slug, false
  end
end
