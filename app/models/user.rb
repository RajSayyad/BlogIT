# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password
  has_secure_token :authentication_token
  belongs_to :organization
  has_many :posts
  validates :name, presence: true
  validates :email, presence: true
end
