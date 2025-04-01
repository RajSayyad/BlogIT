# frozen_string_literal: true

class AssignUserIdToAllPosts < ActiveRecord::Migration[7.1]
  def change
    Post.update_all(user_id: 1)
  end
end
