tx_gridelements.setup.<%= params.slugifiedContentName %> {

  title = LLL:EXT:<%= currentDir %>/Resources/Private/Language/locallang_db.xlf:TSconfig.<%= params.slugifiedContentName %>.title
  description = LLL:EXT:<%= currentDir %>/Resources/Private/Language/locallang_db.xlf:TSconfig.<%= params.slugifiedContentName %>.description
  flexformDS = FILE:EXT:<%= currentDir %>/Configuration/FlexForm/<%= params.slugifiedContentName %>.xml
  icon = EXT:<%= currentDir %>/Resources/Public/Icons/<%= params.slugifiedContentName %>.gif

  config {
    # field's name wich will be displayed
    display = file, caption
  }
}