# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    posts = policy_scope(Post).includes(:categories, :user, :votes)
    authorize Post

    posts_with_votes = posts.map do |post|
      vote = post.votes.find_by(user_id: current_user.id)
      post.as_json(
        include: {
          categories: {},
          user: { only: [:id, :name] }
        }
      ).merge(
        upvotes: post.votes.upvote.count,
        downvotes: post.votes.downvote.count,
        user_vote: vote&.vote_type # "upvote", "downvote", or nil
      )
    end

    render status: :ok, json: { posts: posts_with_votes }
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
    post = Post.find_by(slug: params[:slug])
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

  def upvote
    post = Post.find_by(slug: params[:slug])
    return render status: :not_found, json: { error: "Post not found" } unless post

    vote = post.votes.find_or_initialize_by(user_id: current_user.id)

    if vote.vote_type == "upvote"
      render json: { message: "Already upvoted" }, status: :unprocessable_entity
    else
      vote.vote_type = "upvote"
      vote.save!

      post.update(
        upvotes: post.votes.upvote.count,
        downvotes: post.votes.downvote.count
      )

      render json: {
        message: "Upvoted!",
        upvotes: post.upvotes,
        downvotes: post.downvotes
      }
    end
  end

  def downvote
    post = Post.find_by(slug: params[:slug])
    return render status: :not_found, json: { error: "Post not found" } unless post

    vote = post.votes.find_or_initialize_by(user_id: current_user.id)

    if vote.vote_type == "downvote"
      render json: { message: "Already downvoted" }, status: :unprocessable_entity
    else
      vote.vote_type = "downvote"
      vote.save!

      post.update(
        upvotes: post.votes.upvote.count,
        downvotes: post.votes.downvote.count
      )

      render json: {
        message: "Downvoted!",
        upvotes: post.upvotes,
        downvotes: post.downvotes
      }
    end
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
      params.require(:post).permit(
        :title, :description, :user_id, :organization_id, :is_bloggable, :upvote, :downvote,
        category_ids: [])
    end
end
