# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    posts = Post.includes(:categories, :user).all
    authorize Post
    render status: :ok, json: { posts: posts.as_json(include: { categories: {}, user: { only: [:id, :name] } }) }
  end

  def show
    post = Post.find_by!(slug: params[:slug])
    authorize post
    render status: :ok,
      json: post.as_json(include: { categories: { only: [:id, :name] }, user: { only: [:id, :name] } })
  end

  def create
    post = Post.new(post_params)
    if post.save
      render json: {
        message: "New Post is Created",
        post: post.as_json(only: [:id, :title, :description]).merge(description: post.description.gsub("\n", "<br>"))
      }, status: :ok
    else
      render json: { error: post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    post = Post.find_by!(slug: params[:slug])
    if post.update(post_params)
      render json: {
        message: "Post Updated",
        post: post.as_json(only: [:id, :title, :description]).merge(description: post.description.gsub("\n", "<br>"))
      }, status: :ok
    else
      render json: { error: post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, :user_id, :organization_id, category_ids: [])
    end
end
