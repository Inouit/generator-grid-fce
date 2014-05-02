#page.includeCSS.<%= params.slugifiedContentName %> = EXT:<%= currentDir %>/<%= dirs.cssDir %><%= params.slugifiedContentName %>.css
#page.includeJSFooter.<%= params.slugifiedContentName %> = EXT:<%= currentDir %>/<%= dirs.jsDir %><%= params.slugifiedContentName %>.js

tt_content.gridelements_pi1.20.10.setup.<%= params.slugifiedContentName %> {
  prepend = COA
  prepend {
    5 = < lib.stdheader

    ## // insert here

  }

  outerWrap = <div class="<%= params.slugifiedContentName %>">|</div>

}