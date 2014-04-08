tx_gridelements.setup.<%= params.slugifiedContentName %> {

  title = LLL:EXT:<%= currentDir %>/<%= dirs.llDir %><%= params.slugifiedContentName %>.xlf:TSconfig.<%= params.slugifiedContentName %>.title
  description = LLL:EXT:<%= currentDir %>/<%= dirs.llDir %><%= params.slugifiedContentName %>.xlf:TSconfig.<%= params.slugifiedContentName %>.description
  flexformDS = FILE:EXT:<%= currentDir %>/<%= dirs.flexFormDir %><%= params.slugifiedContentName %>.xml
  icon = EXT:<%= currentDir %>/<%= dirs.iconsDir %><%= params.slugifiedContentName %>.gif

  config {
    # field's name wich will be displayed
    display = title, video
  }
}