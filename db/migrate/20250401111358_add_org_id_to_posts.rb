# frozen_string_literal: true

class AddOrgIdToPosts < ActiveRecord::Migration[7.1]
  def change
    Post.update_all(organization_id: 1)
  end
end
