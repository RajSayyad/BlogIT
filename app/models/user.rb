# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password
  belongs_to :organization
  has_many :posts
  validates :name, presence: true
  validates :email, presence: true
end
