# frozen_string_literal: true

class Post < ApplicationRecord
  validates :title, presence: true, length: { maximum: 125 }
  validates :description, presence: true, length: { maximum: 1000 }
  validates :is_bloggable, inclusion: { in: [true, false] }
  validates :slug, uniqueness: true
  validate :slug_not_changed
  before_create :set_slug

  private

    def set_slug
      title_slug = title.parameterize
      latest_task_slug = Post.where(
        "slug LIKE ? or slug LIKE ?",
        "#{title_slug}",
        "#{title_slug}-%"
      ).order("LENGTH(slug) DESC", slug: :desc).first&.slug
      slug_count = 0
      if latest_task_slug.present?
        slug_count = latest_task_slug.split("-").last.to_i
        only_one = slug_count == 0
        slug_count = 1 if only_one
      end
      slug_candidate = slug_count.positive? ? "#{title_slug} - #{slug_count}" : "#{title_slug}"
      self.slug = slug_candidate
    end

    def slug_not_changed
      if will_save_change_to_slug? && self.persisted?
        errors.add(:slug, "is immutable!")
      end
    end
end
