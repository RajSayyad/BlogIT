# frozen_string_literal: true

class PostPolicy
  attr_reader :user, :post

  def initialize(user, post)
    @user = user
    @post = post
  end

  def index?
    true
  end

  def show?
    (post.is_bloggable? && post.organization_id == user.organization_id) ||
      post.user_id == user.id
  end

  def edit?
    post.user_id == user.id
  end

  def update?
    edit?
  end

  def destroy?
    edit?
  end

  # ✅ Wrap resolve in the Scope class
  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      scope.where(
        "(is_bloggable = ? AND organization_id = ?) OR user_id = ?",
        true,
        user.organization_id,
        user.id
      )
    end
  end
end
