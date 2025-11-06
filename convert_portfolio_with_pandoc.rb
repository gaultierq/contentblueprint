#!/usr/bin/env ruby
require 'fileutils'
require 'nokogiri'

# Portfolio files to convert (excluding category index pages)
portfolio_files = [
  'original_site/contentblueprint.ovh/portfolio/content-strategy/the-collective-case-study/index.html',
  'original_site/contentblueprint.ovh/portfolio/content-strategy/knowledge-audit-case-study/index.html',
  'original_site/contentblueprint.ovh/portfolio/content-strategy/competitive-analysis/index.html',
  'original_site/contentblueprint.ovh/portfolio/content-strategy/content-types/index.html',
  'original_site/contentblueprint.ovh/portfolio/content-strategy/editorial-bible/index.html',
  'original_site/contentblueprint.ovh/portfolio/content-marketing/editorial-calendar-ubisoft/index.html',
  'original_site/contentblueprint.ovh/portfolio/content-marketing/b2b-content-production-for-cometh/index.html',
  'original_site/contentblueprint.ovh/portfolio/content-marketing/content-model-overview-blog/index.html',
  'original_site/contentblueprint.ovh/portfolio/content-marketing/building-a-product-page-for-a-web3-wallet-solution/index.html',
  'original_site/contentblueprint.ovh/portfolio/content-marketing/case-study-using-kpis-analytics-to-optimize-content-strategy/index.html',
  'original_site/contentblueprint.ovh/portfolio/content-copywriting/videos/index.html',
]

portfolio_files.each do |html_file|
  next unless File.exist?(html_file)

  puts "Processing: #{html_file}"

  # Read HTML
  doc = Nokogiri::HTML(File.read(html_file))

  # Extract title
  title_elem = doc.at_css('.page-header h1, .entry-title, h1')
  title = title_elem&.text&.strip || 'Untitled'
  title = title.gsub(' - Content Blueprint', '').strip

  # Determine category from path
  category = if html_file.include?('content-strategy')
    'content-strategy'
  elsif html_file.include?('content-marketing')
    'content-marketing'
  elsif html_file.include?('content-copywriting')
    'content-copywriting'
  else
    'portfolio'
  end

  # Create temp file for pandoc conversion
  temp_html = "/tmp/portfolio_#{File.basename(File.dirname(html_file))}.html"

  # Extract only the page-content div for conversion
  page_content = doc.at_css('.page-content')
  if page_content
    # Extract YouTube video URLs before conversion
    youtube_urls = []
    page_content.css('iframe[src*="youtube.com"]').each do |iframe|
      src = iframe['src']
      if src =~ /youtube\.com\/embed\/([^?]+)/
        video_id = $1
        youtube_urls << "https://www.youtube.com/watch?v=#{video_id}"
      end
    end

    File.write(temp_html, page_content.to_html)

    # Use pandoc to convert HTML to markdown
    temp_md = "/tmp/portfolio_#{File.basename(File.dirname(html_file))}.md"
    system("pandoc -f html -t markdown --wrap=none #{temp_html} -o #{temp_md}")

    if File.exist?(temp_md)
      content = File.read(temp_md)

      # Clean up the markdown
      content = content
        .gsub(/^::+.*$/, '')  # Remove pandoc div markers
        .gsub(/\{[^}]*\}/, '')  # Remove attribute blocks
        .gsub(/\n{3,}/, "\n\n")  # Remove excessive newlines
        .gsub(/\\\n/, "\n")  # Remove escaped newlines
        .strip

      # Add YouTube video links if found
      if youtube_urls.any?
        content += "\n\n## Videos\n\n"
        youtube_urls.each do |url|
          content += "- [Watch on YouTube](#{url})\n"
        end
      end

      # Create corresponding directory in source
      relative_path = html_file.gsub('original_site/contentblueprint.ovh/', '')
      source_dir = File.dirname("source/#{relative_path}")
      FileUtils.mkdir_p(source_dir)

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

      # Clean up temp files
      File.delete(temp_html) if File.exist?(temp_html)
      File.delete(temp_md) if File.exist?(temp_md)
    else
      puts "  -> Pandoc conversion failed"
    end
  else
    puts "  -> Could not find page content"
  end
end

puts "\nDone!"
