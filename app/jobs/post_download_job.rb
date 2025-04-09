# frozen_string_literal: true

class PostDownloadJob
  include Sidekiq::Worker

  def perform(user_id, post_id)
    user = User.find(user_id)
    post = Post.find(post_id)

    ActionCable.server.broadcast(user_id, { message: "Connecting", progress: 25 })

    html_report = ApplicationController.render(
      assigns: { post: },
      template: "posts/postpdf/download",
      layout: "pdf"
    )

    ActionCable.server.broadcast(user_id, { message: "Generating", progress: 50 })

    pdf_data = WickedPdf.new.pdf_from_string(html_report)

    ActionCable.server.broadcast(user_id, { message: "Uploading", progress: 75 })

    if post.postpdf.attached?
      post.postpdf.purge_later
    end

    post.postpdf.attach(
      io: StringIO.new(pdf_data),
      filename: "#{post.slug}.pdf",
      content_type: "application/pdf"
    )

    post.save

    ActionCable.server.broadcast(user_id, { message: "Done", progress: 100, status: "done" })
  end
end
