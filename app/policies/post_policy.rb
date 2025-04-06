# frozen_string_literal: true

class PostPolicy
  attr_reader :user, :post

  def initialize(user, post)
    @user = user
    @post = post
  end

  def index?
    Post.where(organization_id: user.organization_id).exists?
  end

  def show?
    post.organization_id == user.organization_id
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
end
