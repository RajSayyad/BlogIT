# frozen_string_literal: true

class CategoriesController < ApplicationController
  def index
    categories = Category.all
    render status: :ok, json: categories
  end

  def create
    category = Category.new(category_params)
    category.save!
    render status: :ok, json: { message: "New Category Created" }
  end

  private

    def category_params
      params.require(:category).permit(:title)
    end
end
