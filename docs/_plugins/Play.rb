# Output a link to the play server, pre-loaded with the
# (lightly processed) contents of the given file.
#
# Example: {% play_url _exercises/foo.rs %}
#
# The processing is of two kinds.
#
# **Solution/Prompt:** We find any lines like `// START SOLUTION` and
# remove them until a matching `// END SOLUTION` is found. We also
# remove `// PROMPT ` wherever *it* is found. This allows you to write
# Rust code with the solution in place, like so:
#
# ```
# fn main() {
#     // PROMPT panic!("TODO");
#     // START SOLUTION
#     println!("Hello, world!");
#     // END SOLUTION
# }
# ```
#
# **Home URL:** We also replace the text `http://home.url` with
# the configured "exercise_url" from `_config.yaml`.

module Jekyll
  class PlayUrlTag < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
      @path = text.strip
    end

    def render(context)
      site = context.registers[:site]
      exercise_url = site.config["exercise_url"]
      file_text = ""
      in_solution = false
      File.open(@path).each_with_index do |line, index|
        line_num = index + 1

        print("line #{line_num} is #{line.inspect}\n")
        
        # Replace http://home.url with the exercise url
        line = line.gsub(/http:\/\/home.url/, exercise_url)

        # Track whether we are in a solution or not.
        if /\s*\/\/ START SOLUTION\s*$/ =~ line
          if in_solution
            raise "START SOLUTION without corresponding END SOLUTION in #{@path} (line #{line_num})"
          end
          in_solution = true
          next
        end
        if /\s*\/\/ END SOLUTION\s*$/ =~ line
          if !in_solution
            raise "END SOLUTION without corresponding START SOLUTION in #{@path} (line #{line_num})"
          end
          in_solution = false
          next
        end

        # Remove // PROMPT. 
        line = line.gsub(/\/\/ PROMPT /, "")

        # Lint for some common mistakes.
        if line =~ /START/ or line =~ /END/ or line =~ /SOLUTION/
          raise "Did you mean `// (START|END) SOLUTION` on line #{line_num} of #{@path}?"
        end
        if line =~ /PROMPT/
          raise "Did you mean `// PROMPT ` on line #{line_num} of #{@path}?"
        end

        # Track everything that is not in a solution.
        file_text << line unless in_solution
      end
      if in_solution
        raise "START SOLUTION without corresponding END SOLUTION in {@path}"
      end
      form = URI.encode_www_form("code" => file_text, "version" => "nightly")
      uri = URI::HTTP.new("https", nil, "play.rust-lang.org", nil, nil, "", nil, form, nil)
      "#{uri}"
    end
  end
end

Liquid::Template.register_tag('play_url', Jekyll::PlayUrlTag)
