# frozen_string_literal: true

class Post < ApplicationRecord
  validates :title, presence: true, length: { maximum: 125 }
  validates :description, presence: true, length: { maximum: 1000 }
  validates :is_bloggable, inclusion: { in: [true, false] }
end
