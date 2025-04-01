# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    posts = Post.includes(:categories, :user).all
    render status: :ok, json: { posts: posts.as_json(include: { categories: {}, user: { only: [:id, :name] } }) }
  end

  def show
    post = Post.find_by!(slug: params[:slug])
    render status: :ok,
      json: post.as_json(include: { categories: { only: [:id, :name] }, user: { only: [:id, :name] } })
  end

  def create
    post = Post.new(post_params)
    post.save!
    render status: :ok, json: { message: "New Post is Created" }
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, :user_id, :organization_id, category_ids: [])
    end
end
