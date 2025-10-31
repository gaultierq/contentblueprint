#!/usr/bin/env ruby

# Find all portfolio markdown files
portfolio_files = Dir.glob('source/portfolio/**/*.html.md').reject do |f|
  f.include?('write-samples') || f == 'source/portfolio/index.html.md'
end

portfolio_files.each do |md_file|
  puts "Cleaning: #{md_file}"

  content = File.read(md_file)

  # Remove empty figure tags
  content.gsub!(/<figure[^>]*>\s*<\/figure>/m, '')

  # Remove error messages from YouTube embeds
  content.gsub!(/<figure class="wp-block-embed.*?<\/figure>/m, '')

  # Remove "Just a csv" and "Download Resume" lines
  content.gsub!(/Just a csv\s*/, '')
  content.gsub!(/\[Download Resume\].*?\n/, '')

  # Clean up excessive newlines
  content.gsub!(/\n{3,}/, "\n\n")

  # Remove empty divs and player-unavailable messages
  content.gsub!(/<div class="player-unavailable">.*?<\/div>/m, '')
  content.gsub!(/<div[^>]*>\s*<\/div>/m, '')

  # Clean up trailing whitespace
  content.strip!

  File.write(md_file, content + "\n")
  puts "  -> Cleaned"
end

puts "\nDone!"
