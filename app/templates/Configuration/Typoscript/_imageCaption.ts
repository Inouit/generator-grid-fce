page.includeCSS.<%= params.slugifiedContentName %> = EXT:<%= currentDir %>/<%= dirs.cssDir %>/<%= params.slugifiedContentName %>.css

tt_content.gridelements_pi1.20.10.setup.<%= params.slugifiedContentName %> {
  prepend = COA
  prepend {
    5 = < lib.stdheader

    10 = IMAGE
    10{
      file.import.field = flexform_file
      file.import.wrap = uploads/<%= currentDir %>/<%= params.slugifiedContentName %>/
    }

    20 = TEXT
    20{
      field = flexform_caption
      required = 1
      wrap = <p class="caption">|</p>
    }

  }

  outerWrap = <div class="<%= params.slugifiedContentName %>">|</div>
  outerWrap.insertData = 1

}