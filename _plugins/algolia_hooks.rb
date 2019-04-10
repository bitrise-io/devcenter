module Jekyll
  module Algolia
    module Hooks
      def self.before_indexing_each(record, node, context)
        # We use hte urls without the beginning /en for the default language
        record[:url] = record[:url].gsub(/^en\//, '') unless record[:url].nil?

        record
      end
    end
  end
end