# frozen_string_literal: true

class SessionsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token
  def create
    @user = User.find_by(email: login_params[:email].downcase)

    if @user&.authenticate(login_params[:password])
      render status: :ok, json: {
        auth_token: @user.authentication_token,
        user: {
          id: @user.id,
          name: @user.name,
          email: @user.email
        },
        organization: {
          name: @user.organization.name,
          id: @user.organization.id
        }

      }
    else
      render status: :unauthorized, json: { message: "Wrong Credentials" }
    end
  end

  def destroy
    @current_user = nil
  end

  private

    def login_params
      params.require(:login).permit(:email, :password)
    end
end
