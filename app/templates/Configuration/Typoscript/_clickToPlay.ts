page.includeCSS.<%= params.slugifiedContentName %> = EXT:<%= currentDir %>/<%= dirs.cssDir %><%= params.slugifiedContentName %>.css
page.includeJSFooter.<%= params.slugifiedContentName %> = EXT:<%= currentDir %>/<%= dirs.jsDir %><%= params.slugifiedContentName %>.js

tt_content.gridelements_pi1.20.10.setup.<%= params.slugifiedContentName %> {
  prepend = COA
  prepend {
    5 = < lib.stdheader

    10 = IMAGE
    10{
      file.import.field = flexform_file
      file.import.wrap = uploads/<%= currentDir %>/<%= params.slugifiedContentName %>/
      #file.maxW = 565m
      #file.maxH = 330m
    }

    20 = COA
    20 {
      wrap = <div class="infos">|</div>

      10 = TEXT
      10{
        field = flexform_title
        wrap = <h3>|</h3>
      }

      20 = TEXT
      20{
        field = flexform_desc
        wrap = <p class="description">|</p>
        br = 1
      }

      30 = TEXT
      30{
        data = LLL:EXT:<%= currentDir %>/<%= dirs.llDir %><%= params.slugifiedContentName %>.xlf:flexform.<%= params.slugifiedContentName %>.btnLabel
        stdWrap.typolink{
          parameter = javascript:;
          ATagParams = class="play"
        }
        wrap = <p>|</p>
      }
    }


    30 = TEXT
    30{
      field = flexform_video
      wrap = <iframe class="player" width="100%" height="100%" future_src="|?autoplay=1" frameborder="0" allowfullscreen></iframe>

      stdWrap.replacement {
        10 {
          search = watch?v=
          replace = embed/
        }
      }
    }

  }

  outerWrap = <div class="<%= params.slugifiedContentName %>">|</div>

}