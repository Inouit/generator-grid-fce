page.includeCSS.<%= params.slugifiedContentName %> = EXT:<%= currentDir %>/<%= dirs.cssDir %><%= params.slugifiedContentName %>.css
page.includeJSFooter.slick-slider = EXT:<%= currentDir %>/<%= dirs.jsDir %>slick.min.js
page.includeJSFooter.<%= params.slugifiedContentName %> = EXT:<%= currentDir %>/<%= dirs.jsDir %><%= params.slugifiedContentName %>.js

tt_content.gridelements_pi1.20.10.setup.<%= params.slugifiedContentName %> {
  prepend = COA
  prepend {
    5 = < lib.stdheader

    10 = FLEXFORM_SECTION
    10 {
      rootPath = section:images/el

      10 = COA
      10 {
        wrap = <div class="image">|</div>

        10 = IMAGE
        10{
          file.import.data = section_item:image/el/file
          file.import.wrap = uploads/<%= currentDir %>/<%= params.slugifiedContentName %>/
          stdWrap.typolink.parameter.data = section_item:image/el/link
        }

        20 = TEXT
        20{
          data = section_item:image/el/caption
          required = 1
          wrap = <p class="caption">|</p>
          stdWrap.typolink.parameter.data = section_item:image/el/link
        }
      }
    }
  }

  outerWrap = <div class="<%= params.slugifiedContentName %> slick-slider">|</div>
}