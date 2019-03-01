# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)

Gem::Specification.new do |s|
  s.name             = "localization"
  s.version          = "0.0.1"
  s.license          = "MIT"

  s.summary          = %q{Localization plugin for Jekyll}
  s.description      = %q{Plugin for Jekyll 3.x that adds support for localized posts.}

  s.authors          = ["Bitrise"]

  all_files          = `git ls-files -z`.split("\x0")
  s.files            = all_files.grep(%r{^lib/})
  s.require_paths    = ["lib"]
  s.rdoc_options     = ['--charset=UTF-8']

  s.add_runtime_dependency     "jekyll",  ">= 3.0", "< 4.0"
end