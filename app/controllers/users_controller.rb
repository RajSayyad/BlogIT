# frozen_string_literal: true

class UsersController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :create
  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created
    else
      puts @user.errors.full_messages # Add this line for debugging
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation, :organization_id)
    end
end
