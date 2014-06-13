tt_content.gridelements_pi1.20.10.setup.<%= params.slugifiedContentName %> {
  prepend = COA
  prepend {
    <%= params.includeAssets %>1 = COA
    <%= params.includeAssets %>1{
    <%= params.includeCSS %>  10 = INCLUDE_CSS
    <%= params.includeCSS %>  10.<%= params.slugifiedContentName %> = EXT:<%= currentDir %>/<%= dirs.cssDir %><%= params.slugifiedContentName %>.css
    <%= params.includeJS %>  20 = INCLUDE_JS_FOOTER
    <%= params.includeJS %>  20.<%= params.slugifiedContentName %> = EXT:<%= currentDir %>/<%= dirs.jsDir %><%= params.slugifiedContentName %>.js
    <%= params.includeAssets %>}

    5 = < lib.stdheader

    ## // insert here

  }

  outerWrap = <div class="<%= params.slugifiedContentName %>">|</div>

}