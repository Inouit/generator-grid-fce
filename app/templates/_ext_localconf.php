<?php
	$_EXTCONF = unserialize($_EXTCONF);

  // Hooks
  $GLOBALS['TYPO3_CONF_VARS']['SYS']['Objects']['GridElementsTeam\Gridelements\Hooks\DrawItem'] = array(
    'className' => 'Inouit\<%= currentDir %>\Hooks\DrawItem',
  );

  // ## insert here

?>