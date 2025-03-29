# frozen_string_literal: true

require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  test "should get title:string" do
    get posts_title: string_url
    assert_response :success
  end

  test "should get description:string" do
    get posts_description: string_url
    assert_response :success
  end

  test "should get upvotes:integer" do
    get posts_upvotes: integer_url
    assert_response :success
  end

  test "should get downvotes:integer" do
    get posts_downvotes: integer_url
    assert_response :success
  end

  test "should get is_bloggable:boolean" do
    get posts_is_bloggable: boolean_url
    assert_response :success
  end
end
