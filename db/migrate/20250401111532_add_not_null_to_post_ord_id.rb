# frozen_string_literal: true

class AddNotNullToPostOrdId < ActiveRecord::Migration[7.1]
  def change
    change_column_null :posts, :organization_id, false
  end
end
