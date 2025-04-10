# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :authenticate_user_using_x_auth_token
  include Pundit::Authorization

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private

    def authenticate_user_using_x_auth_token
      user_email = request.headers["X-Auth-Email"].presence
      auth_token = request.headers["X-Auth-Token"].presence
      user = user_email && User.find_by!(email: user_email)
      is_valid_token = user && auth_token && ActiveSupport::SecurityUtils.secure_compare(
        user.authentication_token,
        auth_token)
      if is_valid_token
        @current_user = user
      else
        render status: :unauthorized, json: { message: "Could not authenticate with the provided credentials" }
      end
    end

    def current_user
      @current_user
    end

    def user_not_authorized(exception)
      render json: {
        error: "You are not authorized to perform this action.",
        policy: exception.policy.class.to_s.underscore,
        query: exception.query
      }, status: :forbidden
    end
end
