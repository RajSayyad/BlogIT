# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    posts = policy_scope(Post).includes(:categories, :user)
    authorize Post
    render status: :ok, json: {
      posts: posts.as_json(
        include: {
          categories: {},
          user: { only: [:id, :name] }
        })
    }
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
    authorize post
    if post.update(post_params)
      post.touch
      render json: {
        message: "Post Updated",
        post: post.as_json(only: [:id, :title, :description]).merge(description: post.description.gsub("\n", "<br>"))
      }, status: :ok
    else
      render json: { error: post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def toggle_bloggable
    post = Post.find(params[:id])
    authorize post

    post.is_bloggable = false
    if post.save
      render json: { message: "Bloggability toggled", is_bloggable: post.is_bloggable }, status: :ok
    else
      render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def my_posts
    posts = current_user.posts.includes(:categories)
    authorize Post, :my_posts?
    render json: posts.as_json(include: { categories: {}, user: { only: [:id, :name] } }), status: :ok
  end

  def destroy
    post = Post.find_by(slug: params[:slug])
    authorize post
    if post.destroy
      render status: :ok, json: { message: "Post Deleted" }
    else
      render status: :unprocessable_entity, json: { error: post.errors.full_messages }
    end
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, :user_id, :organization_id, :is_bloggable, category_ids: [])
    end
end
