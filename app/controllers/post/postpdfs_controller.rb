# frozen_string_literal: true

class Post::PostpdfsController < ApplicationController
  def create
    post = Post.find_by!(slug: params[:post_slug])

    # Trigger background job to generate PDF
    PostDownloadJob.perform_async(current_user.id, post.id)

    render json: { message: "PDF generation started" }, status: :accepted
  end

  def download
    post = Post.find_by!(slug: params[:post_slug])

    # Check if the PDF is attached
    unless post.postpdf.attached?
      render status: :not_found and return
    end

    # Send the attached PDF file
    send_data post.postpdf.download, filename: pdf_file_name, content_type: "application/pdf"
  end

  private

    # Generate the PDF filename using post_slug from params
    def pdf_file_name
      "#{params[:post_slug]}.pdf" # Corrected to use interpolation
    end
end
