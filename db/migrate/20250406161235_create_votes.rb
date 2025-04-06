# frozen_string_literal: true

class CreateVotes < ActiveRecord::Migration[7.0]
  def change
    create_table :votes do |t|
      t.references :user, null: false, foreign_key: true
      t.references :post, null: false, foreign_key: true
      t.integer :vote_type # 1 for upvote, -1 for downvote

      t.timestamps
    end

    add_index :votes, [:user_id, :post_id], unique: true
  end
end
