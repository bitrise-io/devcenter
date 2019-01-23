module Jekyll
  Jekyll::Hooks.register :site, :post_render do |site, payload|
    # Removes all static files that should not be copied to translated sites.
    #===========================================================================
    default_lang  = payload["site"]["default_lang"]
    current_lang  = payload["site"]["lang"]
    
    static_files  = payload["site"]["static_files"]
    html_pages = payload["site"]["html_pages"]
    
    if default_lang != current_lang
      static_files.delete_if {|x| true }
      html_pages.delete_if {|x| true }
    end
  end ### end site post_render

  Jekyll::Hooks.register :articles, :pre_render do |article|
    languages = article.site.config['languages']
    current_lang = article.site.config['lang']

    url_without_lang = article.url.gsub(/^\/(#{languages.join('|')}\/?)/, '/')
    
    article.data['lang'] = current_lang
    article.data['url_without_lang'] = url_without_lang
  end ### end articles pre_render
  

  class Site
    alias :process_org :process

    def process
      if (!self.config['languages'] or
          self.config['languages'].empty?  or
          !self.config['languages'].all?)
          puts 'You must provide at least one language using the "languages" setting on your _config.yml.'
          
          exit
      end

      # Original Jekyll configurations
      dest_org = self.dest # Destination folder where the website is generated
      
      # Site building only variables
      languages = self.config['languages'] # List of languages set on _config.yml
      
      # Site wide plugin configurations
      self.config['default_lang'] = languages.first # Default language (first language of array set on _config.yml)
      self.config['lang'] = languages.first # Current language being processed
      
      self.data['lang'] = languages.first
      
      # Build the website for default language
      #-------------------------------------------------------------------------
      puts "Building site for default language: \"#{self.config['lang']}\" from: #{self.source} to: #{self.dest}"

      process_org

      languages.drop(1).each do |lang|
        # Language specific config/variables
        @dest                  = dest_org    + "/" + lang
        self.config['lang']    =                     lang
        
        puts "Building site for language: \"#{self.config['lang']}\" from: #{self.source} to: #{@dest}"
        
        process_org
      end

      @dest = dest_org
    end
  end ### Site

  class Collection
    # Read the allowed documents into the collection's array of docs.
    #
    # Returns the sorted array of docs.
    def read
      default_lang = site.config['default_lang']
      lang = site.config['lang']

      filtered_entries.each do |file_path|
        full_path = collection_dir(file_path)
        next if File.directory?(full_path)
        
        # This is the important bit, if `localized` is turned on for the collection skip other locales
        next if self.metadata['localized'] and !file_path.start_with? "#{lang}/"
        if Utils.has_yaml_header? full_path
          read_document(full_path)
        else
          read_static_file(file_path, full_path)
        end
      end

      docs.sort!
    end
  end ### end Collection

  class Document
    # The computed URL for the document. See `Jekyll::URL#to_s` for more details.
    #
    # Returns the computed URL for the document.
    def url
      default_lang = site.config['default_lang']
      current_lang = site.config['lang']

      @url ||= URL.new(
        :template     => url_template,
        :placeholders => url_placeholders,
        :permalink    => permalink
      ).to_s

      # Default lang should not have a subfolder
      if current_lang == default_lang
        @url = @url.gsub(/\/#{current_lang}/, '')
      elsif @url == '/'
        @url = "/#{current_lang}"
      end

      @url
    end

    # The full path to the output file.
    #
    # base_directory - the base path of the output directory
    #
    # Returns the full path to the output file of this document.
    def destination(base_directory)
      current_lang = site.config['lang']
      url_without_lang = url.gsub(/^\/(#{current_lang}\/?)/, '/')

      dest = site.in_dest_dir(base_directory)
      path = site.in_dest_dir(dest, URL.unescape_path(url_without_lang))
      
      if url_without_lang.end_with? "/"
        path = File.join(path, "index.html")
      else
        path << output_ext unless path.end_with? output_ext
      end
      path
    end
  end ### end Document

  class StaticFile
    # Applies a similar URL-building technique as Jekyll::Document that takes
    # the collection's URL template into account. The default URL template can
    # be overriden in the collection's configuration in _config.yml.
    def url
      default_lang = @site.config['default_lang']
      current_lang = @site.config['lang']

      @url ||= if @collection.nil?
        relative_path
      else
        ::Jekyll::URL.new(
          :template     => @collection.url_template,
          :placeholders => placeholders
        )
      end.to_s.chomp("/")

      # Default lang should not have a subfolder
      if current_lang == default_lang
        @url = @url.gsub(/\/#{current_lang}/, '')
      end
      @url
    end

    # Obtain destination path.
    #
    # dest - The String path to the destination dir.
    #
    # Returns destination file path.
    def destination(dest)
      current_lang = @site.config['lang']

      dest_dir = destination_rel_dir.gsub(/^\/(#{current_lang}\/?)/, '/')
      @site.in_dest_dir(*[dest, dest_dir, @name].compact)
    end
  end ### end StaticFile
end