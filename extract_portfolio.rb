#!/usr/bin/env ruby
require 'nokogiri'
require 'fileutils'

def html_to_markdown(element)
  return '' unless element

  result = []

  element.children.each do |node|
    case node.name
    when 'text'
      text = node.text.strip
      result << text unless text.empty?
    when 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
      level = node.name[1].to_i
      result << "\n#{'#' * level} #{node.text.strip}\n"
    when 'p'
      text = node.text.strip
      result << "\n#{text}\n" unless text.empty?
    when 'ul', 'ol'
      node.css('li').each do |li|
        result << "- #{li.text.strip}"
      end
      result << ""
    when 'strong', 'b'
      result << "**#{node.text.strip}**"
    when 'em', 'i'
      result << "*#{node.text.strip}*"
    when 'a'
      href = node['href']
      text = node.text.strip
      if href && !href.start_with?('http')
        result << text
      else
        result << "[#{text}](#{href})"
      end
    when 'div', 'section'
      # Skip certain divs that are likely to be navigation or footers
      classes = node['class'].to_s
      next if classes.include?('wp-block-button') ||
              classes.include?('wp-block-media-text') ||
              classes.include?('elementor')

      result << html_to_markdown(node)
    when 'figure', 'img'
      # Skip images for now
      next
    else
      # Recursively process other elements
      child_content = html_to_markdown(node)
      result << child_content unless child_content.strip.empty?
    end
  end

  result.join("\n").gsub(/\n{3,}/, "\n\n")
end

# Find all portfolio HTML files
portfolio_dirs = [
  'original_site/contentblueprint.ovh/portfolio/content-strategy',
  'original_site/contentblueprint.ovh/portfolio/content-marketing',
  'original_site/contentblueprint.ovh/portfolio/content-copywriting'
]

portfolio_dirs.each do |dir|
  Dir.glob("#{dir}/**/index.html").each do |html_file|
    # Skip category index pages
    next if html_file == "#{dir}/index.html"

    puts "Processing: #{html_file}"

    # Read HTML
    doc = Nokogiri::HTML(File.read(html_file))

    # Extract title from h1 in page-header
    title_elem = doc.at_css('.page-header h1, .entry-title, h1')
    title = title_elem&.text&.strip || 'Untitled'
    title = title.gsub(' - Content Blueprint', '').strip

    # Extract main content from page-content
    main_content = doc.at_css('.page-content') || doc.at_css('main') || doc.at_css('article')

    if main_content
      # Remove unwanted elements
      main_content.css('script, style, nav, header, footer, .wp-block-button, .wp-block-media-text').remove

      # Convert HTML to markdown
      content = html_to_markdown(main_content)

      # Clean up the content
      content = content
        .gsub(/\n{3,}/, "\n\n")  # Remove excessive newlines
        .strip

      # Create corresponding directory in source
      relative_path = html_file.gsub('original_site/contentblueprint.ovh/', '')
      source_dir = File.dirname("source/#{relative_path}")
      FileUtils.mkdir_p(source_dir)

      # Determine category from path
      category = if relative_path.include?('content-strategy')
        'content-strategy'
      elsif relative_path.include?('content-marketing')
        'content-marketing'
      elsif relative_path.include?('content-copywriting')
        'content-copywriting'
      else
        'portfolio'
      end

      # Write markdown file
      md_file = "#{source_dir}/index.html.md"
      File.write(md_file, <<~MD)
        ---
        title: #{title}
        category: #{category}
        ---

        # #{title}

        #{content}
      MD

      puts "  -> Created: #{md_file}"
    else
      puts "  -> Could not find main content"
    end
  end
end

puts "\nDone!"
