# frozen_string_literal: true

class AuthTokenForExistingUsers < ActiveRecord::Migration[7.1]
  def up
    User.reset_column_information

    User.find_each do |user|
      user.update_columns(authentication_token: SecureRandom.base58(24)) if user.authentication_token.blank?
    end
  end

  def down
    User.update_all(authentication_token: nil)
  end
end
