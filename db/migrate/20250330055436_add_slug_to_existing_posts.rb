# frozen_string_literal: true

class AddSlugToExistingPosts < ActiveRecord::Migration[7.1]
  def change
    Post.find_each do |post|
      post.send(:set_slug)
      post.save!(validate: false)
    end
  end
end
