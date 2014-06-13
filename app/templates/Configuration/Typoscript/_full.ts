tt_content.gridelements_pi1.20.10.setup.<%= params.slugifiedContentName %> {
  prepend = COA
  prepend {
    1 = COA
    1{
      10 = INCLUDE_CSS
      10.<%= params.slugifiedContentName %> = EXT:<%= currentDir %>/<%= dirs.cssDir %><%= params.slugifiedContentName %>.css

      20 = INCLUDE_JS_FOOTER
      20.<%= params.slugifiedContentName %> = EXT:<%= currentDir %>/<%= dirs.jsDir %><%= params.slugifiedContentName %>.js
    }

    5 = < lib.stdheader

    10 = IMAGE
    10{
      file.import.field = flexform_file
      file.import.wrap = uploads/<%= currentDir %>/<%= params.slugifiedContentName %>/
    }

    20 = TEXT
    20{
      field = flexform_title
    }

    30 = TEXT
    30{
      field = flexform_desc
      stdWrap.parseFunc < lib.parseFunc_RTE
    }

    40 = FLEXFORM_SECTION
    40 {
      rootPath = section:loopItems/el

      10 = COA
      10{
        #data = section_item:loopItem/el/file
      }
    }
  }

  outerWrap = <div class="<%= params.slugifiedContentName %>">|</div>

}