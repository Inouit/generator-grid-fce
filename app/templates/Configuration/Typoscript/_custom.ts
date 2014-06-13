tt_content.gridelements_pi1.20.10.setup.<%= params.slugifiedContentName %> {
  prepend = COA
  prepend {
    5 = < lib.stdheader

    ## // insert here

  }

  outerWrap = <div class="<%= params.slugifiedContentName %>">|</div>

}