# frozen_string_literal: true

class Vote < ApplicationRecord
  enum vote_type: { downvote: -1, upvote: 1 }
  belongs_to :user
  belongs_to :post
end
