# frozen_string_literal: true

class AddDefaultToIsBloggable < ActiveRecord::Migration[7.1]
  def change
    change_column_default :posts, :is_bloggable, false
  end
end
