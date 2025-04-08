# frozen_string_literal: true

require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module BlogIt
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.

    # ✅ Load dotenv file using the correct module
    Dotenv::Rails.load

    config.load_defaults 7.1
    config.active_job.queue_adapter = :sidekiq

    config.autoload_lib(ignore: %w(assets tasks))

    config.generators do |g|
      g.test_framework :test_unit, fixture: false
    end
  end
end
